import React, {PureComponent} from 'react';
import {localization, VariablePlaceholder} from '../EditSpell.strings';
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

export class CasterSection extends PureComponent<CasterSectionProps> {
  render() {
    const config = this.props.spellCastingConfig;
    const parent = config.id;
    const caster = config.caster;
    const styles = this.props.styles;

    const chosenArkanumTitle: string =
      arkanaLocalization[caster.highestSpellArcanum.arcanumType];

    return (
      <FormSection
        identifier={EditSpellSections.caster}
        title={(identifier, collapsed) => (
          <FormSectionTitle
            title={'Caster'}
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
      </FormSection>
    );
  }
}
