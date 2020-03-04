import React, {PureComponent} from 'react';
import {localization, VariablePlaceholder} from '../../Spell.strings';
import {CharacterValueId} from '../../../../rules/character/CharacterValue.id';
import {DotSelect} from '../../../../components/DotSelect/DotSelect';
import {SpellValueIds} from '../../../../rules/spells/spell-values/SpellValueIds';
import {InputContainer} from '../../../../components/InputContainer/InputContainer';
import {localization as arkanaLocalization} from '../../../../rules/spells/arcana/Arcana.strings';
import {MageSwitch} from '../../../../components/MageSwitch/MageSwitch';
import {NumberSwitch} from '../../../../components/NumberSwitch/NumberSwitch';
import {FormSection} from '../../../../components/FormSection/FormSection';
import {FormSectionTitle} from '../../../../components/FormSection/FormSectionTitle/FormSectionTitle';
import {EditSpellSections} from '../EditSpell.sections';
import {CasterSectionProps} from './CasterSection.props';
import {CasterSectionDescription} from './CasterSectionDescription';
import {DefaultAdditionalDiceModifier} from '../../../../rules/spells/Spell.config.caster';

export class CasterSection extends PureComponent<CasterSectionProps> {
  render() {
    const config = this.props.spellCastingConfig;
    const parent = config.id;
    const caster = config.caster;
    const styles = this.props.styles;

    const chosenArkanumTitle: string =
      arkanaLocalization[caster.highestSpellArcanum.arcanumType];

    let additionalDices =
      config.caster.additionalSpellCastingDice[
        DefaultAdditionalDiceModifier.default
      ];
    let numberOfAdditionalDices = additionalDices
      ? additionalDices.diceModifier
      : 0;

    return (
      <FormSection
        identifier={EditSpellSections.caster}
        title={(identifier, collapsed) => (
          <FormSectionTitle
            title={localization.caster_section_title}
            iconName="hat-wizard"
            collapsed={collapsed}
            description={
              <CasterSectionDescription
                spellCastingConfig={config}
                theme={this.props.theme}
              />
            }
          />
        )}
        containerStyles={styles.section}
        collapsed={this.props.collapsed}
        onChangeCollapse={this.props.onChangeCollapse}>
        <InputContainer
          title={localization.gnosis_title}
          containerStyle={styles.inputContainer}>
          <DotSelect
            key={CharacterValueId.gnosis + 'select'}
            parent={parent}
            value={caster.gnosis.diceModifier}
            identifier={CharacterValueId.gnosis}
            didSelect={this.props.setValue}
            numberOfDots={10}
          />
        </InputContainer>
        <InputContainer
          title={localization.wisdom_title}
          containerStyle={styles.inputContainer}>
          <DotSelect
            key={CharacterValueId.wisdom + 'select'}
            parent={parent}
            value={caster.wisdom.diceModifier}
            identifier={CharacterValueId.wisdom}
            didSelect={this.props.setValue}
            numberOfDots={10}
          />
        </InputContainer>
        <InputContainer
          title={localization.highest_arcanum_value.replace(
            VariablePlaceholder.highestArcanum,
            chosenArkanumTitle,
          )}
          containerStyle={styles.inputContainer}>
          <DotSelect
            key={SpellValueIds.highestArcanumValue + 'select'}
            parent={parent}
            value={caster.highestSpellArcanum.diceModifier}
            identifier={SpellValueIds.highestArcanumValue}
            didSelect={this.props.setValue}
            numberOfDots={5}
          />
        </InputContainer>
        <MageSwitch
          parent={parent}
          containerStyle={styles.switch}
          identifier={SpellValueIds.isMagesHighestArcanum}
          value={caster.highestSpellArcanum.highest}
          label={localization.is_arcanum_the_highest_acranum.replace(
            VariablePlaceholder.highestArcanum,
            chosenArkanumTitle,
          )}
          onValueChanged={this.props.setBooleanValue}
        />
        <MageSwitch
          parent={parent}
          containerStyle={styles.switch}
          identifier={SpellValueIds.isMagesRulingArcanum}
          value={caster.highestSpellArcanum.rulingArcana}
          label={localization.is_ruling_arcanum.replace(
            VariablePlaceholder.highestArcanum,
            chosenArkanumTitle,
          )}
          onValueChanged={this.props.setBooleanValue}
        />
        <InputContainer
          title={localization.number_of_active_spells}
          containerStyle={styles.inputContainer}>
          <NumberSwitch
            key={SpellValueIds.activeSpells + 'select'}
            identifier={SpellValueIds.activeSpells}
            parent={parent}
            selected={caster.activeSpells}
            onChangedTo={this.props.setValue}
            minValue={0}
            maxValue={20}
            singularItemLabel={localization.number_of_active_spells_singular}
            pluralItemLabel={localization.number_of_active_spells_plural}
          />
        </InputContainer>
        <InputContainer
          title={localization.number_of_additional_dice_title}
          containerStyle={styles.inputContainer}>
          <NumberSwitch
            key={SpellValueIds.additionalDice + 'select'}
            identifier={SpellValueIds.additionalDice}
            parent={parent}
            selected={numberOfAdditionalDices}
            onChangedTo={this.props.setValue}
            minValue={-5}
            maxValue={15}
            singularItemLabel={localization.dice}
            pluralItemLabel={localization.dice}
          />
        </InputContainer>
        <MageSwitch
          parent={parent}
          containerStyle={styles.switch}
          identifier={CharacterValueId.willpower}
          value={caster.spendsWillpower}
          label={localization.spends_willpower_title}
          onValueChanged={this.props.setBooleanValue}
        />
      </FormSection>
    );
  }
}
