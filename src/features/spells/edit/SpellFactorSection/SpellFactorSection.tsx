import React, {PureComponent} from 'react';
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
import {Text, View, ViewStyle, StyleSheet} from 'react-native';
import {
  spellFactorName,
  spellFactorLevelName,
} from '../../../../rules/spells/spell-factors/SpellFactor.strings';
import {SpellFactorSectionDescription} from './SpellFactorSectionDescription';
import {SpellFactorLevel} from '../../../../rules/spells/spell-factors/SpellFactor.level';
import {spellFactorLabel} from '../../../../rules/spells/spell-factors/SpellFactor.labels';

export class SpellFactorSection extends DynamiclyStyledPureComponent<
  SpellFactorSectionProps,
  SpellFactorSectionStyle
> {
  makeStyle(): SpellFactorSectionStyle {
    return makeSpellFaktorSectionStyle(this.props.theme);
  }

  render() {
    const config = this.props.spellCastingConfig;
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
          <SpellFactorText
            gnosis={gnosis}
            level={factors.potency.level}
            type={SpellFactorType.potency}
            value={factors.potency.value}
            primaryFactor={primaryFactor}
            highestArcanumValue={highesArcanumValue}
          />
        </InputContainer>
        <InputContainer
          title={spellFactorName(SpellFactorType.castingTime)}
          containerStyle={styles.inputContainer}>
          <SpellFactorText
            gnosis={gnosis}
            level={factors.castingTime.level}
            type={SpellFactorType.castingTime}
            value={factors.castingTime.value}
            primaryFactor={primaryFactor}
            highestArcanumValue={highesArcanumValue}
          />
        </InputContainer>
        <InputContainer
          title={spellFactorName(SpellFactorType.duration)}
          containerStyle={styles.inputContainer}>
          <SpellFactorText
            gnosis={gnosis}
            level={factors.duration.level}
            type={SpellFactorType.duration}
            value={factors.duration.value}
            primaryFactor={primaryFactor}
            highestArcanumValue={highesArcanumValue}
          />
        </InputContainer>
        <InputContainer
          title={spellFactorName(SpellFactorType.range)}
          containerStyle={styles.inputContainer}>
          <SpellFactorText
            gnosis={gnosis}
            level={factors.range.level}
            type={SpellFactorType.range}
            value={factors.range.value}
            primaryFactor={primaryFactor}
            highestArcanumValue={highesArcanumValue}
          />
        </InputContainer>
        <InputContainer
          title={spellFactorName(SpellFactorType.scale)}
          containerStyle={styles.inputContainer}>
          <SpellFactorText
            gnosis={gnosis}
            level={factors.scale.level}
            type={SpellFactorType.scale}
            value={factors.scale.value}
            primaryFactor={primaryFactor}
            highestArcanumValue={highesArcanumValue}
          />
        </InputContainer>
      </FormSection>
    );
  }
}

type SpellFactorTextProps = {
  type: SpellFactorType;
  value: number;
  level: SpellFactorLevel;
  gnosis: number;
  primaryFactor: SpellFactorType;
  highestArcanumValue: number;
  containerStyle?: ViewStyle;
};

class SpellFactorText extends PureComponent<SpellFactorTextProps> {
  render() {
    let label = spellFactorLabel(
      this.props.type,
      this.props.level,
      this.props.value,
      this.props.gnosis,
      this.props.primaryFactor,
      this.props.highestArcanumValue,
    );
    return (
      <View style={[style.container, this.props.containerStyle]}>
        <Text>{label}</Text>
        <View>
          <Text>{spellFactorLevelName(this.props.level)}</Text>
        </View>
      </View>
    );
  }
}

type SpellFactorStyle = {
  container: ViewStyle;
};

let style = StyleSheet.create<SpellFactorStyle>({
  container: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
