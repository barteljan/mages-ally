import React from 'react';
import {FormSection} from '../../../../components/FormSection/FormSection';
import {FormSectionTitle} from '../../../../components/FormSection/FormSectionTitle/FormSectionTitle';
import {ParadoxSectionProps} from './ParadoxSection.props';
import {localization} from '../EditSpell.strings';
import {EditSpellSections} from '../EditSpell.sections';
import {InputContainer} from '../../../../components/InputContainer/InputContainer';
import {SpellValueIds} from '../../../../rules/spells/spell-values/SpellValueIds';
import {ButtonGroup} from 'react-native-elements';
import {DynamiclyStyledPureComponent} from '../../../../components/DynamiclyStyledPureComponent';
import {
  ParadoxSectionStyle,
  makeSpellSectionStyle,
} from './ParadoxSection.style';
import {ParadoxSectionDescription} from './ParadoxSectionDescription';
import {MageSwitch} from '../../../../components/MageSwitch/MageSwitch';
import {NumberSwitch} from '../../../../components/NumberSwitch/NumberSwitch';
import {labelForSleeperWittness} from '../../../../rules/spells/paradox/SleeperWittnesses.strings';
import {SleeperWitnesses} from '../../../../rules/spells/paradox/SleeperWitnesses';

export class ParadoxSection extends DynamiclyStyledPureComponent<
  ParadoxSectionProps,
  ParadoxSectionStyle
> {
  makeStyle(): ParadoxSectionStyle {
    return makeSpellSectionStyle(this.props.theme);
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
          this.props.spellCastingConfig.id,
        );
        break;
      case 1:
        this.props.setStringValue(
          SpellValueIds.sleeperWitnesses,
          SleeperWitnesses.one,
          this.props.spellCastingConfig.id,
        );
        break;
      case 2:
        this.props.setStringValue(
          SpellValueIds.sleeperWitnesses,
          SleeperWitnesses.few,
          this.props.spellCastingConfig.id,
        );
        break;
      case 3:
        this.props.setStringValue(
          SpellValueIds.sleeperWitnesses,
          SleeperWitnesses.largeGroup,
          this.props.spellCastingConfig.id,
        );
        break;
      case 4:
        this.props.setStringValue(
          SpellValueIds.sleeperWitnesses,
          SleeperWitnesses.fullCrowd,
          this.props.spellCastingConfig.id,
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

  render() {
    const config = this.props.spellCastingConfig;
    const parent = config.id;
    const paradox = config.paradox;
    const styles = this.props.styles;
    const buttonGroupContainerHeight = 52 * 1.5;

    return (
      <FormSection
        identifier={EditSpellSections.spell}
        title={(identifier, collapsed) => (
          <FormSectionTitle
            title={localization.paradox_section_title}
            iconName="bomb"
            collapsed={collapsed}
            description={
              <ParadoxSectionDescription
                spellCastingConfig={this.props.spellCastingConfig}
                theme={this.props.theme}
              />
            }
          />
        )}
        containerStyles={styles.section}
        collapsed={this.props.collapsed}
        onChangeCollapse={this.props.onChangeCollapse}>
        <MageSwitch
          parent={parent}
          containerStyle={styles.switch}
          identifier={SpellValueIds.inuredToSpell}
          value={paradox.inuredToSpell}
          label={localization.inured_spell_title}
          onValueChanged={this.props.setBooleanValue}
        />
        <InputContainer
          title={localization.previous_paradox_rolls_title}
          containerStyle={styles.inputContainer}>
          <NumberSwitch
            key={SpellValueIds.numberOfPreviousParadoxRolls + 'select'}
            identifier={SpellValueIds.numberOfPreviousParadoxRolls}
            parent={parent}
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
            key={SpellValueIds.additionalManaSpendForReducingParadox + 'select'}
            identifier={SpellValueIds.additionalManaSpendForReducingParadox}
            parent={parent}
            selected={paradox.manaSpent}
            onChangedTo={this.props.setValue}
            minValue={0}
            maxValue={20}
            singularItemLabel={localization.additional_mana_spend_singular}
            pluralItemLabel={localization.additional_mana_spend_plural}
          />
        </InputContainer>
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
      </FormSection>
    );
  }
}
