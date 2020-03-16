import React, {PureComponent} from 'react';
import {localization, VariablePlaceholder} from '../../Spell.strings';
import {CharacterValueId} from '../../../../rules/character/CharacterValue.id';
import {SpellValueIds} from '../../../../rules/spells/spell-values/SpellValueIds';
import {localization as arkanaLocalization} from '../../../../rules/spells/arcana/Arcana.strings';
import {FormSection} from '../../../../components/FormSection/FormSection';
import {FormSectionTitle} from '../../../../components/FormSection/FormSectionTitle/FormSectionTitle';
import {EditSpellSections} from '../EditSpell.sections';
import {CasterSectionProps} from './CasterSection.props';
import {CasterSectionDescription} from './CasterSectionDescription';
import {DefaultAdditionalDiceModifier} from '../../../../rules/spells/Spell.config.caster';
import {Form, FormRowItem} from '../../../../components/Form/Form';
import {makeDotsRowItem} from '../../../../components/Form/DotSelectRow';
import {makeSwitchRowItem} from '../../../../components/Form/SwitchRow';
import {makeNumberPickerRowItem} from '../../../../components/Form/NumberPickerRow';

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

    const formItems: FormRowItem[] = [
      makeDotsRowItem(CharacterValueId.gnosis, {
        parent,
        value: caster.gnosis.diceModifier,
        label: localization.gnosis_title,
      }),
      makeDotsRowItem(CharacterValueId.wisdom, {
        parent,
        value: caster.wisdom.diceModifier,
        label: localization.wisdom_title,
      }),
      makeDotsRowItem(SpellValueIds.highestArcanumValue, {
        parent,
        value: caster.highestSpellArcanum.diceModifier,
        label: localization.highest_arcanum_value.replace(
          VariablePlaceholder.highestArcanum,
          chosenArkanumTitle,
        ),
        maxValue: 5,
      }),
      makeSwitchRowItem(SpellValueIds.isMagesHighestArcanum, {
        parent,
        value: caster.highestSpellArcanum.highest,
        label: localization.is_arcanum_the_highest_acranum.replace(
          VariablePlaceholder.highestArcanum,
          chosenArkanumTitle,
        ),
      }),
      makeSwitchRowItem(SpellValueIds.isMagesRulingArcanum, {
        parent,
        value: caster.highestSpellArcanum.rulingArcana,
        label: localization.is_ruling_arcanum.replace(
          VariablePlaceholder.highestArcanum,
          chosenArkanumTitle,
        ),
      }),
      makeNumberPickerRowItem(
        SpellValueIds.activeSpells,
        localization.number_of_active_spells_singular,
        localization.number_of_active_spells_plural,
        {
          parent,
          value: caster.activeSpells,
          label: localization.number_of_active_spells,
        },
      ),
      makeNumberPickerRowItem(
        SpellValueIds.additionalDice,
        localization.dice,
        localization.dice,
        {
          parent,
          value: numberOfAdditionalDices,
          label: localization.number_of_additional_dice_title,
        },
      ),
      makeSwitchRowItem(CharacterValueId.willpower, {
        parent,
        value: caster.spendsWillpower,
        label: localization.spends_willpower_title,
      }),
    ];

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
        <Form
          identifier={'caster'}
          rows={formItems}
          theme={this.props.theme}
          onChangeBoolean={this.props.setBooleanValue}
          onChangeNumber={this.props.setValue}
          onChangeString={this.props.setStringValue}
        />
      </FormSection>
    );
  }
}
