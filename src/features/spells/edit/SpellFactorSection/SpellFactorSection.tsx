import React from 'react';
import {FormSection} from '../../../../components/FormSection/FormSection';
import {FormSectionTitle} from '../../../../components/FormSection/FormSectionTitle/FormSectionTitle';
import {localization} from '../EditSpell.strings';
import {EditSpellSections} from '../EditSpell.sections';
import {DynamiclyStyledPureComponent} from '../../../../components/DynamiclyStyledPureComponent';
import {SpellFactorSectionProps} from './SpellFactorSection.props';
import {
  SpellFactorSectionStyle,
  makeSpellFaktorSectionStyle,
} from './SpellFactorSection.styles';
import {InputContainer} from '../../../../components/InputContainer/InputContainer';
import {SpellFactorType} from '../../../../rules/spells/spell-factors/SpellFactor.type';
import {spellFactorName} from '../../../../rules/spells/spell-factors/SpellFactor.strings';
import {SpellFactorSectionDescription} from './SpellFactorSectionDescription';
import {SpellFactorRow} from './row/SpellFactorRow';

export class SpellFactorSection extends DynamiclyStyledPureComponent<
  SpellFactorSectionProps,
  SpellFactorSectionStyle
> {
  makeStyle(): SpellFactorSectionStyle {
    return makeSpellFaktorSectionStyle(this.props.theme);
  }

  render() {
    const config = this.props.spellCastingConfig;
    const parent = config.id;
    const styles = this.props.styles;
    const gnosis = config.caster.gnosis.diceModifier;
    const primaryFactor = config.spell.primaryFactor;
    const highesArcanumValue = config.caster.highestSpellArcanum.diceModifier;
    const factors = config.spell.spellFactors;
    return (
      <FormSection
        identifier={EditSpellSections.spellFactor}
        title={(identifier, collapsed) => (
          <FormSectionTitle
            title={localization.spell_factor_section_title}
            iconName="meteor"
            collapsed={collapsed}
            description={
              <SpellFactorSectionDescription
                spellCastingConfig={config}
                theme={this.props.theme}
                showDices={true}
              />
            }
          />
        )}
        containerStyles={styles.section}
        collapsed={this.props.collapsed}
        onChangeCollapse={this.props.onChangeCollapse}>
        <InputContainer
          title={spellFactorName(SpellFactorType.potency)}
          containerStyle={styles.inputContainer}>
          <SpellFactorRow
            gnosis={gnosis}
            factor={factors.potency}
            primaryFactor={primaryFactor}
            highestArcanumValue={highesArcanumValue}
            parent={parent}
            {...this.props}
          />
        </InputContainer>
        <InputContainer
          title={spellFactorName(SpellFactorType.castingTime)}
          containerStyle={styles.inputContainer}>
          <SpellFactorRow
            gnosis={gnosis}
            factor={factors.castingTime}
            primaryFactor={primaryFactor}
            highestArcanumValue={highesArcanumValue}
            parent={parent}
            {...this.props}
          />
        </InputContainer>
        <InputContainer
          title={spellFactorName(SpellFactorType.duration)}
          containerStyle={styles.inputContainer}>
          <SpellFactorRow
            gnosis={gnosis}
            factor={factors.duration}
            primaryFactor={primaryFactor}
            highestArcanumValue={highesArcanumValue}
            parent={parent}
            {...this.props}
          />
        </InputContainer>
        <InputContainer
          title={spellFactorName(SpellFactorType.range)}
          containerStyle={styles.inputContainer}>
          <SpellFactorRow
            gnosis={gnosis}
            factor={factors.range}
            primaryFactor={primaryFactor}
            highestArcanumValue={highesArcanumValue}
            parent={parent}
            {...this.props}
          />
        </InputContainer>
        <InputContainer
          title={spellFactorName(SpellFactorType.scale)}
          containerStyle={styles.inputContainer}>
          <SpellFactorRow
            gnosis={gnosis}
            factor={factors.scale}
            primaryFactor={primaryFactor}
            highestArcanumValue={highesArcanumValue}
            parent={parent}
            {...this.props}
          />
        </InputContainer>
      </FormSection>
    );
  }
}
