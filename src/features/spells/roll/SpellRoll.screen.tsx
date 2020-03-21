import React, {PureComponent, Ref} from 'react';
import {
  SpellRollScreenStyle,
  makeSpellRollScreenStyle,
} from './SpellRoll.styles';
import {SpellRollScreenProps} from './SpellRoll.props';
import {withTheme} from 'react-native-paper';
import {View, Platform, UIManager, LayoutAnimation} from 'react-native';
import {isEqual} from 'lodash';
import {SpellListItem} from '../list-item/SpellListItem';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native-gesture-handler';
import {localization} from '../Spell.strings';
import {SpellValueIds} from '../../../rules/spells/spell-values/SpellValueIds';
import {labelForParadoxResolution} from '../../../rules/spells/paradox/Paradox.strings';
import {FormButton} from '../../../components/FormButton/FormButton';
import {SpellLogicValueIdentifier} from '../Spell.identifiers';
import {ParadoxResolution} from '../../../rules/spells/paradox/ParadoxResolution';
import {SpellRollInfo} from './SpellRollInfo/SpellRollInfo';
import {makeNumberPickerRowItem} from '../../../components/Form/NumberPickerRow';
import {makeTextOptionsRowItem} from '../../../components/Form/TextOptionsRow';
import {Form, FormRowItem} from '../../../components/Form/Form';
import {SpellRollParadoxSection} from './ParadoxSection/SpellRollParadoxSection';
import {makeSwitchRowItem} from '../../../components/Form/SwitchRow';

type SpellRollScreenState = {
  styles: SpellRollScreenStyle;
  sectionCollapsed: boolean;
  spellRollInfoCollapsed: boolean;
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
    spellRollInfoCollapsed: false,
  };

  constructor(props: SpellRollScreenProps) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  scrollView: Ref<ScrollView> | undefined;

  show = () => this.props.showSpell(this.props.config.id);

  onRollDice = () => {
    if (this.props.spellRollInfoConfig) {
      this.setState({spellRollInfoCollapsed: true}, () => {
        setTimeout(() => {
          this.props.rollDice(this.props.config.id);
          this.setState({spellRollInfoCollapsed: false});
        }, 600);
      });
    } else {
      this.props.rollDice(this.props.config.id);
      this.setState({spellRollInfoCollapsed: false});
    }
    if (this.scrollView) {
      //@ts-ignore
      this.scrollView.scrollTo({x: 0, y: 0, animated: true});
    }
  };

  onSetSpellRollInfoCollapsed = (collapsed: boolean): void => {
    this.setState({spellRollInfoCollapsed: collapsed});
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
      prevState.spellRollInfoCollapsed !== this.state.spellRollInfoCollapsed ||
      !isEqual(prevProps.roll, this.props.roll)
    ) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    }
  }

  makeStyle(): SpellRollScreenStyle {
    return makeSpellRollScreenStyle(this.props.theme);
  }

  onChangeCollapse = (collapsed: boolean) => {
    this.setState({sectionCollapsed: collapsed});
  };

  scrollViewRef = (ref: any) => (this.scrollView = ref);

  render = () => {
    const config = this.props.config;
    const spell = this.props.spell;
    const roll = this.props.roll;
    const styles = this.state.styles;
    const parent = config.id;

    const spellRollInfo = this.props.spellRollInfoConfig ? (
      <SpellRollInfo
        theme={this.props.theme}
        collapsed={this.state.spellRollInfoCollapsed}
        onSetCollapse={this.onSetSpellRollInfoCollapsed}
        spellInformationConfig={this.props.spellRollInfoConfig}
      />
    ) : (
      <View style={styles.spellRollInfoReplacement} />
    );

    let items: FormRowItem[] = [];

    if (spell.roll.paradox.number > 0) {
      items.push(
        makeTextOptionsRowItem(
          SpellLogicValueIdentifier.paradoxResolution,
          [ParadoxResolution.contain, ParadoxResolution.release],
          [
            labelForParadoxResolution(ParadoxResolution.contain),
            labelForParadoxResolution(ParadoxResolution.release),
          ],
          {
            parent,
            value: roll.config.paradoxResolution,
            label: localization.paradox_resolution_title,
          },
        ),
      );

      items.push(
        makeSwitchRowItem(SpellLogicValueIdentifier.rollParadoxFirst, {
          parent,
          value: roll.config.rollParadox,
          label: localization.spell_roll_roll_paradox_first_title,
        }),
      );

      if (
        !roll.config.rollParadox &&
        roll.config.paradoxResolution === ParadoxResolution.release
      ) {
        items.push(
          makeNumberPickerRowItem(
            SpellLogicValueIdentifier.paradoxRollSuccesses,
            localization.spell_roll_successes_on_paradox_roll_singular,
            localization.spell_roll_successes_on_paradox_roll_plural,
            {
              parent,
              value: roll.config.successesOnParadoxRoll,
              label: localization.spell_roll_successes_on_paradox_roll_title,
            },
          ),
        );
      }

      if (roll.config.paradoxResolution === ParadoxResolution.contain) {
        items.push(
          makeSwitchRowItem(
            SpellLogicValueIdentifier.rollWisdomToContainParadox,
            {
              parent,
              value: roll.config.rollWisdomToContainParadox,
              label: localization.spell_roll_roll_contain_paradox_title,
            },
          ),
        );
      }
    }

    items.push(
      makeNumberPickerRowItem(
        SpellValueIds.extraReach,
        localization.extra_reach_singular,
        localization.extra_reach_plural,
        {
          parent,
          value: config.spell.additionalSpecs.extraReach,
          label: localization.extra_reach_title,
        },
      ),
    );

    items.push(
      makeNumberPickerRowItem(
        SpellValueIds.activeSpells,
        localization.number_of_active_spells_singular,
        localization.number_of_active_spells_plural,
        {
          parent,
          value: config.caster.activeSpells,
          label: localization.number_of_active_spells,
        },
      ),
    );

    return (
      <ScrollView style={styles.container} ref={this.scrollViewRef}>
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
          <Form
            identifier={'roll'}
            rows={items}
            theme={this.props.theme}
            onChangeBoolean={this.props.setBooleanValue}
            onChangeNumber={this.props.setValue}
            onChangeString={this.props.setStringValue}
          />
          <SpellRollParadoxSection
            {...this.props}
            collapsed={this.state.sectionCollapsed}
            containerStyles={styles.section}
            onChangeCollapse={this.onChangeCollapse}
          />
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
  };
}

export const SpellRollScreen = withTheme(_SpellRollScreen);
