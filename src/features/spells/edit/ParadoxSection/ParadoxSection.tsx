import React from 'react';
import {FormSection} from '../../../../components/FormSection/FormSection';
import {FormSectionTitle} from '../../../../components/FormSection/FormSectionTitle/FormSectionTitle';
import {ParadoxSectionProps} from './ParadoxSection.props';
import {localization} from '../../Spell.strings';
import {EditSpellSections} from '../EditSpell.sections';
import {SpellValueIds} from '../../../../rules/spells/spell-values/SpellValueIds';
import {DynamiclyStyledPureComponent} from '../../../../components/DynamiclyStyledPureComponent';
import {
  ParadoxSectionStyle,
  makeSpellSectionStyle,
} from './ParadoxSection.style';
import {ParadoxSectionDescription} from './ParadoxSectionDescription';
import {labelForSleeperWittness} from '../../../../rules/spells/paradox/Paradox.strings';
import {SleeperWitnesses} from '../../../../rules/spells/paradox/SleeperWitnesses';
import {FormRowItem, Form} from '../../../../components/Form/Form';
import {makeSwitchRowItem} from '../../../../components/Form/SwitchRow';
import {makeNumberPickerRowItem} from '../../../../components/Form/NumberPickerRow';
import {makeTextOptionsRowItem} from '../../../../components/Form/TextOptionsRow';

export class ParadoxSection extends DynamiclyStyledPureComponent<
  ParadoxSectionProps,
  ParadoxSectionStyle
> {
  makeStyle(): ParadoxSectionStyle {
    return makeSpellSectionStyle(this.props.theme);
  }

  render() {
    const config = this.props.spellCastingConfig;
    const parent = config.id;
    const paradox = config.paradox;
    const styles = this.props.styles;

    const formItems: FormRowItem[] = [
      makeSwitchRowItem(SpellValueIds.inuredToSpell, {
        parent,
        value: paradox.inuredToSpell,
        label: localization.inured_spell_title,
      }),
      makeNumberPickerRowItem(
        SpellValueIds.numberOfPreviousParadoxRolls,
        localization.previous_paradox_rolls_singular,
        localization.previous_paradox_rolls_plural,
        {
          parent,
          value: paradox.previousParadoxRolls,
          label: localization.previous_paradox_rolls_title,
        },
      ),
      makeNumberPickerRowItem(
        SpellValueIds.additionalManaSpendForReducingParadox,
        localization.additional_mana_spend_singular,
        localization.additional_mana_spend_plural,
        {
          parent,
          value: paradox.manaSpent,
          label: localization.additional_mana_spend_title,
        },
      ),
      makeTextOptionsRowItem(
        SpellValueIds.sleeperWitnesses,
        [
          SleeperWitnesses.none,
          SleeperWitnesses.one,
          SleeperWitnesses.few,
          SleeperWitnesses.largeGroup,
          SleeperWitnesses.fullCrowd,
        ],
        [
          labelForSleeperWittness(SleeperWitnesses.none),
          labelForSleeperWittness(SleeperWitnesses.one),
          labelForSleeperWittness(SleeperWitnesses.few),
          labelForSleeperWittness(SleeperWitnesses.largeGroup),
          labelForSleeperWittness(SleeperWitnesses.fullCrowd),
        ],
        {
          parent,
          value: paradox.sleeperWitnesses,
          label: localization.witnesses_title,
        },
      ),
    ];

    return (
      <FormSection
        identifier={EditSpellSections.paradox}
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
        <Form
          identifier={'paradox'}
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
