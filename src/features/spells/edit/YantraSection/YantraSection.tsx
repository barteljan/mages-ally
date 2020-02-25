import React from 'react';
import {FormSection} from '../../../../components/FormSection/FormSection';
import {FormSectionTitle} from '../../../../components/FormSection/FormSectionTitle/FormSectionTitle';
import {YantraSectionProps} from './YantraSection.props';
import {localization} from '../EditSpell.strings';
import {EditSpellSections} from '../EditSpell.sections';
import {InputContainer} from '../../../../components/InputContainer/InputContainer';
import {DotSelect} from '../../../../components/DotSelect/DotSelect';
import {SpellValueIds} from '../../../../rules/spells/spell-values/SpellValueIds';
import {SpellFactorType} from '../../../../rules/spells/spell-factors/SpellFactor.type';
import {spellFactorName} from '../../../../rules/spells/spell-factors/SpellFactor.strings';
import {DynamiclyStyledPureComponent} from '../../../../components/DynamiclyStyledPureComponent';
import {
  YantraSectionStyle,
  makeYantraSectionStyle,
} from './YantraSection.style';
import {SpellType} from '../../../../rules/spells/Spell.type';
import {spellTypeName} from '../../../../rules/spells/Spell.config.strings';
import {YantraType} from '../../../../rules/spells/yantra/Yantra.type';
import {SpellCastingConfig} from '../../../../rules/spells/Spell.config';
import {View} from 'react-native';

export class YantraSection extends DynamiclyStyledPureComponent<
  YantraSectionProps,
  YantraSectionStyle
> {
  makeStyle(): YantraSectionStyle {
    return makeYantraSectionStyle(this.props.theme);
  }

  primaryFactorItems = [
    spellFactorName(SpellFactorType.potency),
    spellFactorName(SpellFactorType.duration),
  ];

  spellTypeItems = [
    spellTypeName(SpellType.improvised),
    spellTypeName(SpellType.praxis),
    spellTypeName(SpellType.rote),
  ];

  changedPrimaryFactor = (index: number) => {
    switch (index) {
      case 0:
        this.props.setStringValue(
          SpellValueIds.primaryFactor,
          SpellFactorType.potency,
          this.props.spellCastingConfig.id,
        );
        break;
      case 1:
        this.props.setStringValue(
          SpellValueIds.primaryFactor,
          SpellFactorType.duration,
          this.props.spellCastingConfig.id,
        );
    }
  };

  changedSpellType = (index: number) => {
    switch (index) {
      case 0:
        this.props.setStringValue(
          SpellValueIds.spellType,
          SpellType.improvised,
          this.props.spellCastingConfig.id,
        );
        break;
      case 1:
        this.props.setStringValue(
          SpellValueIds.spellType,
          SpellType.praxis,
          this.props.spellCastingConfig.id,
        );
        break;
      case 2:
        this.props.setStringValue(
          SpellValueIds.spellType,
          SpellType.rote,
          this.props.spellCastingConfig.id,
        );
        break;
    }
  };

  indexForSpellType(type: SpellType): number {
    switch (type) {
      case SpellType.improvised:
        return 0;
      case SpellType.praxis:
        return 1;
      case SpellType.rote:
        return 2;
    }
  }

  roteSkillSelect = (config: SpellCastingConfig) => {
    const spell = config.spell;
    const styles = this.props.styles;
    const parent = config.id;

    const roteSkillYantra = config.spell.yantras.filter(
      yantra => yantra.yantraType === YantraType.roteSkill,
    )[0];

    let roteSkillSelect =
      spell.type === SpellType.rote ? (
        <InputContainer
          title={localization.rote_skill_title}
          containerStyle={styles.inputContainer}>
          <DotSelect
            key={YantraType.roteSkill + 'select'}
            parent={parent}
            value={roteSkillYantra ? roteSkillYantra.diceModifier : 0}
            identifier={YantraType.roteSkill}
            didSelect={this.props.setValue}
            numberOfDots={10}
          />
        </InputContainer>
      ) : null;

    return roteSkillSelect;
  };

  render() {
    /*
    const config = this.props.spellCastingConfig;
    const parent = config.id;
    const caster = config.caster;
    const spell = config.spell;
    

    const chosenArkanumTitle: string =
      arkanaLocalization[caster.highestSpellArcanum.arcanumType];

    const buttonGroupContainerHeight = 52 * 1.5;

    let roteSkillSelect = this.roteSkillSelect(config);
    */

    const styles = this.props.styles;

    return (
      <FormSection
        identifier={EditSpellSections.yantras}
        title={(identifier, collapsed) => (
          <FormSectionTitle
            title={localization.yantra_section_title}
            iconName="magic"
            collapsed={collapsed}
          />
        )}
        containerStyles={styles.section}
        collapsed={this.props.collapsed}
        onChangeCollapse={this.props.onChangeCollapse}>
        <View />
      </FormSection>
    );
  }
}
