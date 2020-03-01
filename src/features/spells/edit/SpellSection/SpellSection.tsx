import React from 'react';
import {FormSection} from '../../../../components/FormSection/FormSection';
import {FormSectionTitle} from '../../../../components/FormSection/FormSectionTitle/FormSectionTitle';
import {SpellSectionProps} from './SpellSection.props';
import {localization, VariablePlaceholder} from '../EditSpell.strings';
import {EditSpellSections} from '../EditSpell.sections';
import {localization as arkanaLocalization} from '../../../../rules/spells/arcana/Arcana.strings';
import {InputContainer} from '../../../../components/InputContainer/InputContainer';
import {DotSelect} from '../../../../components/DotSelect/DotSelect';
import {SpellValueIds} from '../../../../rules/spells/spell-values/SpellValueIds';
import {ButtonGroup} from 'react-native-elements';
import {SpellFactorType} from '../../../../rules/spells/spell-factors/SpellFactor.type';
import {spellFactorName} from '../../../../rules/spells/spell-factors/SpellFactor.strings';
import {DynamiclyStyledPureComponent} from '../../../../components/DynamiclyStyledPureComponent';
import {SpellSectionStyle, makeSpellSectionStyle} from './SpellSection.style';
import {SpellType} from '../../../../rules/spells/Spell.type';
import {spellTypeName} from '../../../../rules/spells/Spell.config.strings';
import {YantraType} from '../../../../rules/spells/yantra/Yantra.type';
import {SpellCastingConfig} from '../../../../rules/spells/Spell.config';
import {SpellSectionDescription} from './SpellSectionDescription';
import {NumberSwitch} from '../../../../components/NumberSwitch/NumberSwitch';
import {MageSwitch} from '../../../../components/MageSwitch/MageSwitch';

export class SpellSection extends DynamiclyStyledPureComponent<
  SpellSectionProps,
  SpellSectionStyle
> {
  makeStyle(): SpellSectionStyle {
    return makeSpellSectionStyle(this.props.theme);
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
    const config = this.props.spellCastingConfig;
    const parent = config.id;
    const caster = config.caster;
    const spell = config.spell;
    const styles = this.props.styles;

    const chosenArkanumTitle: string =
      arkanaLocalization[caster.highestSpellArcanum.arcanumType];

    const buttonGroupContainerHeight = 52 * 1.5;

    let roteSkillSelect = this.roteSkillSelect(config);

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
        <InputContainer
          title={localization.required_arcanum_value_title.replace(
            VariablePlaceholder.highestArcanum,
            chosenArkanumTitle,
          )}
          containerStyle={styles.inputContainer}>
          <DotSelect
            key={SpellValueIds.requiredArcanumValue + 'select'}
            parent={parent}
            value={spell.requiredArcanumValue}
            identifier={SpellValueIds.requiredArcanumValue}
            didSelect={this.props.setValue}
            numberOfDots={5}
          />
        </InputContainer>
        <InputContainer
          title={localization.primary_factor_title}
          containerStyle={styles.inputContainer}
          height={buttonGroupContainerHeight}>
          <ButtonGroup
            buttons={this.primaryFactorItems}
            onPress={this.changedPrimaryFactor}
            selectedIndex={
              spell.primaryFactor === SpellFactorType.potency ? 0 : 1
            }
            selectedButtonStyle={this.state.styles.selectedButton}
          />
        </InputContainer>
        <InputContainer
          title={localization.spell_type_title}
          containerStyle={styles.inputContainer}
          height={buttonGroupContainerHeight}>
          <ButtonGroup
            buttons={this.spellTypeItems}
            onPress={this.changedSpellType}
            selectedIndex={this.indexForSpellType(spell.type)}
            selectedButtonStyle={this.state.styles.selectedButton}
          />
        </InputContainer>
        {roteSkillSelect}
        <InputContainer
          title={localization.extra_reach_title}
          containerStyle={styles.inputContainer}>
          <NumberSwitch
            key={SpellValueIds.extraReach + 'select'}
            identifier={SpellValueIds.extraReach}
            parent={parent}
            selected={spell.additionalSpecs.extraReach}
            onChangedTo={this.props.setValue}
            minValue={0}
            maxValue={20}
            singularItemLabel={localization.extra_reach_singular}
            pluralItemLabel={localization.extra_reach_plural}
          />
        </InputContainer>
        <MageSwitch
          parent={parent}
          containerStyle={styles.switch}
          identifier={SpellValueIds.changePrimarySpellFactor}
          value={spell.additionalSpecs.changePrimarySpellFactor}
          label={localization.changed_primary_factor_title}
          onValueChanged={this.props.setBooleanValue}
        />
        <MageSwitch
          parent={parent}
          containerStyle={styles.switch}
          identifier={SpellValueIds.timeInABottle}
          value={spell.additionalSpecs.timeInABottle}
          label={localization.time_in_a_bottle_title}
          onValueChanged={this.props.setBooleanValue}
        />
        <MageSwitch
          parent={parent}
          containerStyle={styles.switch}
          identifier={SpellValueIds.everywhere}
          value={spell.additionalSpecs.everywhere}
          label={localization.everywhere_title}
          onValueChanged={this.props.setBooleanValue}
        />
        <MageSwitch
          parent={parent}
          containerStyle={styles.switch}
          identifier={SpellValueIds.symphaticRange}
          value={spell.additionalSpecs.sympatheticRange}
          label={localization.sympathetic_range_title}
          onValueChanged={this.props.setBooleanValue}
        />
        <MageSwitch
          parent={parent}
          containerStyle={styles.switch}
          identifier={SpellValueIds.temporalSympathy}
          value={spell.additionalSpecs.temporalSympathy}
          label={localization.temporal_sympathy_title}
          onValueChanged={this.props.setBooleanValue}
        />
      </FormSection>
    );
  }
}
