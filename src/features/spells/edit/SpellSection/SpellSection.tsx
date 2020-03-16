import React from 'react';
import {FormSection} from '../../../../components/FormSection/FormSection';
import {FormSectionTitle} from '../../../../components/FormSection/FormSectionTitle/FormSectionTitle';
import {SpellSectionProps} from './SpellSection.props';
import {localization, VariablePlaceholder} from '../../Spell.strings';
import {EditSpellSections} from '../EditSpell.sections';
import {localization as arkanaLocalization} from '../../../../rules/spells/arcana/Arcana.strings';
import {SpellValueIds} from '../../../../rules/spells/spell-values/SpellValueIds';
import {SpellFactorType} from '../../../../rules/spells/spell-factors/SpellFactor.type';
import {spellFactorName} from '../../../../rules/spells/spell-factors/SpellFactor.strings';
import {DynamiclyStyledPureComponent} from '../../../../components/DynamiclyStyledPureComponent';
import {SpellSectionStyle, makeSpellSectionStyle} from './SpellSection.style';
import {SpellType} from '../../../../rules/spells/Spell.type';
import {spellTypeName} from '../../../../rules/spells/Spell.config.strings';
import {YantraType} from '../../../../rules/spells/yantra/Yantra.type';
import {SpellSectionDescription} from './SpellSectionDescription';
import {DiceRollAgainType} from '../../../../rules/dice-roll/DiceRollAgainType';
import {Form, FormRowItem} from '../../../../components/Form/Form';
import {makeDotsRowItem} from '../../../../components/Form/DotSelectRow';
import {makeTextOptionsRowItem} from '../../../../components/Form/TextOptionsRow';
import {makeSwitchRowItem} from '../../../../components/Form/SwitchRow';
import {makeNumberPickerRowItem} from '../../../../components/Form/NumberPickerRow';

export class SpellSection extends DynamiclyStyledPureComponent<
  SpellSectionProps,
  SpellSectionStyle
> {
  makeStyle(): SpellSectionStyle {
    return makeSpellSectionStyle(this.props.theme);
  }

  render() {
    const config = this.props.spellCastingConfig;
    const parent = config.id;
    const caster = config.caster;
    const spell = config.spell;
    const styles = this.props.styles;

    const chosenArkanumTitle: string =
      arkanaLocalization[caster.highestSpellArcanum.arcanumType];

    let formItems: FormRowItem[] = [];

    formItems.push(
      makeDotsRowItem(SpellValueIds.requiredArcanumValue, {
        parent,
        value: spell.requiredArcanumValue,
        label: localization.required_arcanum_value_title.replace(
          VariablePlaceholder.highestArcanum,
          chosenArkanumTitle,
        ),
        maxValue: 5,
      }),
    );

    formItems.push(
      makeTextOptionsRowItem(
        SpellValueIds.primaryFactor,
        [SpellFactorType.potency, SpellFactorType.duration],
        [
          spellFactorName(SpellFactorType.potency),
          spellFactorName(SpellFactorType.duration),
        ],
        {
          parent,
          value: spell.primaryFactor,
          label: localization.primary_factor_title,
        },
      ),
    );
    formItems.push(
      makeSwitchRowItem(SpellValueIds.changePrimarySpellFactor, {
        parent,
        value: spell.additionalSpecs.changePrimarySpellFactor,
        label: localization.changed_primary_factor_title,
      }),
    );

    formItems.push(
      makeTextOptionsRowItem(
        SpellValueIds.spellType,
        [SpellType.improvised, SpellType.praxis, SpellType.rote],
        [
          spellTypeName(SpellType.improvised!),
          spellTypeName(SpellType.praxis!),
          spellTypeName(SpellType.rote!),
        ],
        {
          parent,
          value: spell.type,
          label: localization.spell_type_title,
        },
      ),
    );

    if (spell.type === SpellType.rote) {
      const roteSkillYantra = config.spell.yantras.filter(
        yantra => yantra.yantraType === YantraType.roteSkill,
      )[0];

      formItems.push(
        makeDotsRowItem(YantraType.roteSkill, {
          parent,
          value: roteSkillYantra ? roteSkillYantra.diceModifier : 0,
          label: localization.rote_skill_title,
          maxValue: 10,
        }),
      );
    }

    formItems.push(
      makeNumberPickerRowItem(
        SpellValueIds.extraReach,
        localization.extra_reach_singular,
        localization.extra_reach_plural,
        {
          parent,
          value: spell.additionalSpecs.extraReach,
          label: localization.extra_reach_title,
        },
      ),
    );

    formItems.push(
      makeNumberPickerRowItem(
        SpellValueIds.manaCost,
        localization.mana_cost_singular,
        localization.mana_cost_plural,
        {
          parent,
          value: spell.additionalSpecs.manaCost,
          label: localization.mana_cost_title,
        },
      ),
    );

    formItems.push(
      makeTextOptionsRowItem(
        SpellValueIds.rollAgainType,
        [
          DiceRollAgainType.tenAgain,
          DiceRollAgainType.nineAgain,
          DiceRollAgainType.eightAgain,
          DiceRollAgainType.none,
        ],
        [
          localization.tenAgain,
          localization.nineAgain,
          localization.eightAgain,
          localization.none,
        ],
        {
          parent,
          value: this.props.spellCastingConfig.spell.rollAgainType,
          label: localization.tenAgain_title,
        },
      ),
    );

    formItems.push(
      makeSwitchRowItem(SpellValueIds.roteQuality, {
        parent,
        value: this.props.spellCastingConfig.spell.roteQuality,
        label: localization.rote_quality_title,
      }),
    );

    return (
      <FormSection
        identifier={EditSpellSections.spell}
        title={(identifier, collapsed) => (
          <FormSectionTitle
            title={localization.spell_section_title}
            iconName="magic"
            collapsed={collapsed}
            description={
              <SpellSectionDescription
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
          identifier={'spell'}
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
