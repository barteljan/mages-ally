import React, {PureComponent} from 'react';
import {
  SpellRollScreenStyle,
  makeSpellRollScreenStyle,
} from './SpellRoll.styles';
import {SpellRollScreenProps} from './SpellRoll.props';
import {withTheme} from 'react-native-paper';
import {
  View,
  LayoutRectangle,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import {isEqual} from 'lodash';
import {SpellListItem} from '../list-item/SpellListItem';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native-gesture-handler';
import {InputContainer} from '../../../components/InputContainer/InputContainer';
import {localization} from '../Spell.strings';
import {SpellValueIds} from '../../../rules/spells/spell-values/SpellValueIds';
import {NumberSwitch} from '../../../components/NumberSwitch/NumberSwitch';
import {ButtonGroup} from 'react-native-elements';
import {
  labelForSleeperWittness,
  labelForParadoxResolution,
} from '../../../rules/spells/paradox/Paradox.strings';
import {SleeperWitnesses} from '../../../rules/spells/paradox/SleeperWitnesses';
import {FormButton} from '../../../components/FormButton/FormButton';
import {MageSwitch} from '../../../components/MageSwitch/MageSwitch';
import {SpellLogicValueIdentifier} from '../Spell.identifiers';
import {FormSection} from '../../../components/FormSection/FormSection';
import {FormSectionTitle} from '../../../components/FormSection/FormSectionTitle/FormSectionTitle';
import {ParadoxSectionDescription} from '../edit/ParadoxSection/ParadoxSectionDescription';
import {ParadoxResolution} from '../../../rules/spells/paradox/ParadoxResolution';
import {SpellRollInfo} from './SpellRollInfo/SpellRollInfo';

type SpellRollScreenState = {
  styles: SpellRollScreenStyle;
  overlayVisible: boolean;
  overlayHeight: number;
  sectionCollapsed: boolean;
};

class _SpellRollScreen extends PureComponent<
  SpellRollScreenProps,
  SpellRollScreenState
> {
  //@ts-ignore
  state = {
    styles: this.makeStyle(),
    overlayVisible: false,
    overlayHeight: 100,
    sectionCollapsed: true,
  };

  constructor(props: SpellRollScreenProps) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  show = () => this.props.showSpell(this.props.config.id);

  onRollDice = () => {
    this.props.rollDice(this.props.config.id);
  };

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <View style={this.state.styles.headerIconContainer}>
          <Icon
            name="magic"
            size={18}
            color={this.props.theme.colors.primary}
            onPress={this.onRollDice}
          />
        </View>
      ),
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(
    prevProps: SpellRollScreenProps,
    prevState: SpellRollScreenState,
  ) {
    const styles = this.makeStyle();
    if (!isEqual(this.state.styles, styles)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({styles: styles});
    }

    if (
      prevState.sectionCollapsed !== this.state.sectionCollapsed ||
      !isEqual(prevProps.roll, this.props.roll)
    ) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    }
  }

  makeStyle(): SpellRollScreenStyle {
    return makeSpellRollScreenStyle(this.props.theme);
  }

  onLayout = (rect: LayoutRectangle) =>
    this.setState({overlayHeight: rect.height});

  paradoxResolutionItems = [
    labelForParadoxResolution(ParadoxResolution.contain),
    labelForParadoxResolution(ParadoxResolution.release),
  ];

  changedParadoxResolution = (index: number) => {
    switch (index) {
      case 0:
        this.props.setStringValue(
          SpellLogicValueIdentifier.paradoxResolution,
          ParadoxResolution.contain,
          this.props.config.id,
        );
        break;
      case 1:
        this.props.setStringValue(
          SpellLogicValueIdentifier.paradoxResolution,
          ParadoxResolution.release,
          this.props.config.id,
        );
        break;
    }
  };

  indexForParadoxResolution(resolution: ParadoxResolution): number {
    switch (resolution) {
      case ParadoxResolution.contain:
        return 0;
      case ParadoxResolution.release:
        return 1;
    }
  }

  witnessesItems = [
    labelForSleeperWittness(SleeperWitnesses.none),
    labelForSleeperWittness(SleeperWitnesses.one),
    labelForSleeperWittness(SleeperWitnesses.few),
    labelForSleeperWittness(SleeperWitnesses.largeGroup),
    labelForSleeperWittness(SleeperWitnesses.fullCrowd),
  ];

  changedWitnesses = (index: number) => {
    switch (index) {
      case 0:
        this.props.setStringValue(
          SpellValueIds.sleeperWitnesses,
          SleeperWitnesses.none,
          this.props.config.id,
        );
        break;
      case 1:
        this.props.setStringValue(
          SpellValueIds.sleeperWitnesses,
          SleeperWitnesses.one,
          this.props.config.id,
        );
        break;
      case 2:
        this.props.setStringValue(
          SpellValueIds.sleeperWitnesses,
          SleeperWitnesses.few,
          this.props.config.id,
        );
        break;
      case 3:
        this.props.setStringValue(
          SpellValueIds.sleeperWitnesses,
          SleeperWitnesses.largeGroup,
          this.props.config.id,
        );
        break;
      case 4:
        this.props.setStringValue(
          SpellValueIds.sleeperWitnesses,
          SleeperWitnesses.fullCrowd,
          this.props.config.id,
        );
        break;
    }
  };

  indexForWitnesses(type: SleeperWitnesses): number {
    switch (type) {
      case SleeperWitnesses.none:
        return 0;
      case SleeperWitnesses.one:
        return 1;
      case SleeperWitnesses.few:
        return 2;
      case SleeperWitnesses.largeGroup:
        return 3;
      case SleeperWitnesses.fullCrowd:
        return 4;
    }
  }

  onChangeCollapse = (collapsed: boolean) => {
    this.setState({sectionCollapsed: collapsed});
  };

  render() {
    const config = this.props.config;
    const spell = this.props.spell;
    const paradox = config.paradox;
    const roll = this.props.roll;
    const buttonGroupContainerHeight = 52 * 1.5;
    const styles = this.state.styles;

    const paradoxResolution =
      spell.roll.paradox.number > 0 ? (
        <InputContainer
          title={localization.paradox_resolution_title}
          containerStyle={styles.inputContainer}
          height={buttonGroupContainerHeight}>
          <ButtonGroup
            buttons={this.paradoxResolutionItems}
            onPress={this.changedParadoxResolution}
            selectedIndex={this.indexForParadoxResolution(
              roll.config.paradoxResolution,
            )}
            selectedButtonStyle={this.state.styles.selectedButton}
          />
        </InputContainer>
      ) : null;

    const rollParadox =
      spell.roll.paradox.number > 0 ? (
        <MageSwitch
          theme={this.props.theme}
          value={roll.config.rollParadox}
          label={localization.spell_roll_roll_paradox_first_title}
          identifier={SpellLogicValueIdentifier.rollParadoxFirst}
          onValueChanged={this.props.setBooleanValue}
          parent={config.id}
          containerStyle={styles.inputContainer}
        />
      ) : null;

    const paradoxSuccesses =
      spell.roll.paradox.number > 0 &&
      !roll.config.rollParadox &&
      roll.config.paradoxResolution === ParadoxResolution.release ? (
        <InputContainer
          title={localization.spell_roll_successes_on_paradox_roll_title}
          containerStyle={styles.inputContainer}>
          <NumberSwitch
            key={SpellLogicValueIdentifier.paradoxRollSuccesses + 'select'}
            identifier={SpellLogicValueIdentifier.paradoxRollSuccesses}
            parent={config.id}
            selected={roll.config.successesOnParadoxRoll}
            onChangedTo={this.props.setValue}
            minValue={0}
            maxValue={20}
            singularItemLabel={
              localization.spell_roll_successes_on_paradox_roll_singular
            }
            pluralItemLabel={
              localization.spell_roll_successes_on_paradox_roll_plural
            }
          />
        </InputContainer>
      ) : null;

    const rollContainParadox =
      spell.roll.paradox.number > 0 &&
      roll.config.paradoxResolution === ParadoxResolution.contain ? (
        <MageSwitch
          theme={this.props.theme}
          value={roll.config.rollWisdomToContainParadox}
          label={localization.spell_roll_roll_contain_paradox_title}
          identifier={SpellLogicValueIdentifier.rollWisdomToContainParadox}
          onValueChanged={this.props.setBooleanValue}
          parent={config.id}
          containerStyle={styles.inputContainer}
        />
      ) : null;

    const spellRollInfo = this.props.spellRollInfoConfig ? (
      <SpellRollInfo
        theme={this.props.theme}
        spellInformationConfig={this.props.spellRollInfoConfig}
      />
    ) : (
      undefined
    );

    return (
      <ScrollView style={styles.container}>
        <SpellListItem
          theme={this.props.theme}
          config={this.props.config}
          spell={this.props.spell}
          showSpell={this.show}
          onAction={this.show}
          hideDescription={true}
          actionItem={
            <View style={styles.spellItemActionContainer}>
              <Icon
                name="ellipsis-h"
                size={20}
                color={this.props.theme.colors.primary}
              />
            </View>
          }
          wrapperStyle={styles.spellItemWrapper}
          spellFactorStyle={styles.spellFactorStyle}>
          {spellRollInfo}
        </SpellListItem>
        <View style={styles.formContainer}>
          {paradoxResolution}
          {rollParadox}
          {paradoxSuccesses}
          {rollContainParadox}
          <InputContainer
            title={localization.number_of_active_spells}
            containerStyle={styles.inputContainer}>
            <NumberSwitch
              key={SpellValueIds.activeSpells + 'select'}
              identifier={SpellValueIds.activeSpells}
              parent={this.props.config.id}
              selected={this.props.config.caster.activeSpells}
              onChangedTo={this.props.setValue}
              minValue={0}
              maxValue={20}
              singularItemLabel={localization.number_of_active_spells_singular}
              pluralItemLabel={localization.number_of_active_spells_plural}
            />
          </InputContainer>
          <InputContainer
            title={localization.extra_reach_title}
            containerStyle={styles.inputContainer}>
            <NumberSwitch
              key={SpellValueIds.extraReach + 'select'}
              identifier={SpellValueIds.extraReach}
              parent={this.props.config.id}
              selected={this.props.config.spell.additionalSpecs.extraReach}
              onChangedTo={this.props.setValue}
              minValue={0}
              maxValue={20}
              singularItemLabel={localization.extra_reach_singular}
              pluralItemLabel={localization.extra_reach_plural}
            />
          </InputContainer>
          <FormSection
            identifier={'paradox'}
            title={(identifier, collapsed) => (
              <FormSectionTitle
                title={localization.paradox_section_title}
                iconName="bomb"
                collapsed={collapsed}
                description={
                  <ParadoxSectionDescription
                    spellCastingConfig={config}
                    theme={this.props.theme}
                  />
                }
              />
            )}
            containerStyles={styles.section}
            collapsed={this.state.sectionCollapsed}
            onChangeCollapse={this.onChangeCollapse}>
            <InputContainer
              title={localization.witnesses_title}
              containerStyle={styles.inputContainer}
              height={buttonGroupContainerHeight}>
              <ButtonGroup
                buttons={this.witnessesItems}
                onPress={this.changedWitnesses}
                selectedIndex={this.indexForWitnesses(paradox.sleeperWitnesses)}
                selectedButtonStyle={this.state.styles.selectedButton}
              />
            </InputContainer>
            <InputContainer
              title={localization.previous_paradox_rolls_title}
              containerStyle={styles.inputContainer}>
              <NumberSwitch
                key={SpellValueIds.numberOfPreviousParadoxRolls + 'select'}
                identifier={SpellValueIds.numberOfPreviousParadoxRolls}
                parent={config.id}
                selected={paradox.previousParadoxRolls}
                onChangedTo={this.props.setValue}
                minValue={0}
                maxValue={20}
                singularItemLabel={localization.previous_paradox_rolls_singular}
                pluralItemLabel={localization.previous_paradox_rolls_plural}
              />
            </InputContainer>
            <InputContainer
              title={localization.additional_mana_spend_title}
              containerStyle={styles.inputContainer}>
              <NumberSwitch
                key={
                  SpellValueIds.additionalManaSpendForReducingParadox + 'select'
                }
                identifier={SpellValueIds.additionalManaSpendForReducingParadox}
                parent={config.id}
                selected={paradox.manaSpent}
                onChangedTo={this.props.setValue}
                minValue={0}
                maxValue={20}
                singularItemLabel={localization.additional_mana_spend_singular}
                pluralItemLabel={localization.additional_mana_spend_plural}
              />
            </InputContainer>
          </FormSection>
          <FormButton
            parent={config.id}
            theme={this.props.theme}
            title={localization.cast_spell_button_text}
            onPress={this.onRollDice}
            containerStyle={this.state.styles.rollDiceButtonStyle}
            actionComponent={
              <Icon
                name="magic"
                size={18}
                color={this.props.theme.colors.primary}
                onPress={this.onRollDice}
              />
            }
          />
        </View>
      </ScrollView>
    );
  }
}

export const SpellRollScreen = withTheme(_SpellRollScreen);
