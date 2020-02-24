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
import {spellFactorName} from '../../../../rules/spells/spell-factors/SpellFactor.strings';
import {SpellFactorSectionDescription} from './SpellFactorSectionDescription';
import {SpellFactorRow} from './row/SpellFactorRow';
import {SpellFactor} from '../../../../rules/spells/spell-factors/SpellFactor';
import {ViewStyle, StyleSheet, TouchableOpacity, View} from 'react-native';
import {RadioButton, Text} from 'react-native-paper';
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
            level={factors.potency.level}
            type={SpellFactorType.potency}
            value={factors.potency.value}
            primaryFactor={primaryFactor}
            highestArcanumValue={highesArcanumValue}
            standardComponent={
              <SpellFactorSelectionList
                spellFactor={factors.potency}
                primaryFactor={primaryFactor}
                highestArcanumValue={highesArcanumValue}
                gnosis={gnosis}
                parent={parent}
                setSpellFactorValue={this.props.setSpellFactorValue}
              />
            }
            advancedComponent={
              <SpellFactorSelectionList
                spellFactor={factors.potency}
                primaryFactor={primaryFactor}
                highestArcanumValue={highesArcanumValue}
                gnosis={gnosis}
                parent={parent}
                setSpellFactorValue={this.props.setSpellFactorValue}
              />
            }
            parent={parent}
            {...this.props}
          />
        </InputContainer>
        <InputContainer
          title={spellFactorName(SpellFactorType.castingTime)}
          containerStyle={styles.inputContainer}>
          <SpellFactorRow
            gnosis={gnosis}
            level={factors.castingTime.level}
            type={SpellFactorType.castingTime}
            value={factors.castingTime.value}
            primaryFactor={primaryFactor}
            highestArcanumValue={highesArcanumValue}
            parent={parent}
            standardComponent={
              <SpellFactorSelectionList
                spellFactor={factors.castingTime}
                primaryFactor={primaryFactor}
                highestArcanumValue={highesArcanumValue}
                gnosis={gnosis}
                parent={parent}
                setSpellFactorValue={this.props.setSpellFactorValue}
              />
            }
            advancedComponent={
              <SpellFactorSelectionList
                spellFactor={factors.castingTime}
                primaryFactor={primaryFactor}
                highestArcanumValue={highesArcanumValue}
                gnosis={gnosis}
                parent={parent}
                setSpellFactorValue={this.props.setSpellFactorValue}
              />
            }
            {...this.props}
          />
        </InputContainer>
        <InputContainer
          title={spellFactorName(SpellFactorType.duration)}
          containerStyle={styles.inputContainer}>
          <SpellFactorRow
            gnosis={gnosis}
            level={factors.duration.level}
            type={SpellFactorType.duration}
            value={factors.duration.value}
            primaryFactor={primaryFactor}
            highestArcanumValue={highesArcanumValue}
            parent={parent}
            standardComponent={
              <SpellFactorSelectionList
                spellFactor={factors.duration}
                primaryFactor={primaryFactor}
                highestArcanumValue={highesArcanumValue}
                gnosis={gnosis}
                parent={parent}
                setSpellFactorValue={this.props.setSpellFactorValue}
              />
            }
            advancedComponent={
              <SpellFactorSelectionList
                spellFactor={factors.duration}
                primaryFactor={primaryFactor}
                highestArcanumValue={highesArcanumValue}
                gnosis={gnosis}
                parent={parent}
                setSpellFactorValue={this.props.setSpellFactorValue}
              />
            }
            {...this.props}
          />
        </InputContainer>
        <InputContainer
          title={spellFactorName(SpellFactorType.range)}
          containerStyle={styles.inputContainer}>
          <SpellFactorRow
            gnosis={gnosis}
            level={factors.range.level}
            type={SpellFactorType.range}
            value={factors.range.value}
            primaryFactor={primaryFactor}
            highestArcanumValue={highesArcanumValue}
            parent={parent}
            standardComponent={
              <SpellFactorSelectionList
                spellFactor={factors.range}
                primaryFactor={primaryFactor}
                highestArcanumValue={highesArcanumValue}
                gnosis={gnosis}
                parent={parent}
                setSpellFactorValue={this.props.setSpellFactorValue}
              />
            }
            advancedComponent={
              <SpellFactorSelectionList
                spellFactor={factors.range}
                primaryFactor={primaryFactor}
                highestArcanumValue={highesArcanumValue}
                gnosis={gnosis}
                parent={parent}
                setSpellFactorValue={this.props.setSpellFactorValue}
              />
            }
            {...this.props}
          />
        </InputContainer>
        <InputContainer
          title={spellFactorName(SpellFactorType.scale)}
          containerStyle={styles.inputContainer}>
          <SpellFactorRow
            gnosis={gnosis}
            level={factors.scale.level}
            type={SpellFactorType.scale}
            value={factors.scale.value}
            primaryFactor={primaryFactor}
            highestArcanumValue={highesArcanumValue}
            parent={parent}
            standardComponent={
              <SpellFactorSelectionList
                spellFactor={factors.scale}
                primaryFactor={primaryFactor}
                highestArcanumValue={highesArcanumValue}
                gnosis={gnosis}
                parent={parent}
                setSpellFactorValue={this.props.setSpellFactorValue}
              />
            }
            advancedComponent={
              <SpellFactorSelectionList
                spellFactor={factors.scale}
                primaryFactor={primaryFactor}
                highestArcanumValue={highesArcanumValue}
                gnosis={gnosis}
                parent={parent}
                setSpellFactorValue={this.props.setSpellFactorValue}
              />
            }
            {...this.props}
          />
        </InputContainer>
      </FormSection>
    );
  }
}

export type SpellFactorSelectionListProps = {
  parent: string;
  spellFactor: SpellFactor;
  highestArcanumValue: number;
  primaryFactor: SpellFactorType;
  gnosis: number;
  setSpellFactorValue: (
    factor: SpellFactorType,
    value: number,
    parent: string,
  ) => void;
};

export class SpellFactorSelectionList extends PureComponent<
  SpellFactorSelectionListProps
> {
  onStringValueChange = (value: string) => {
    const numberValue = parseInt(value, 10);
    if (!isNaN(numberValue)) {
      this.onValueChange(numberValue);
    }
  };

  onValueChange = (value: number) => {
    this.props.setSpellFactorValue(
      this.props.spellFactor.spellFactorType,
      value,
      this.props.parent,
    );
  };

  render() {
    const props = this.props;
    const factor = props.spellFactor;

    let options: Element[] = [];

    let maxIndex = 1;
    if (factor.level === SpellFactorLevel.standard) {
      maxIndex = factor.maxStandardValue;
    } else {
      maxIndex = factor.maxAdvancedValue;
    }

    for (let i = 0; i < maxIndex; i++) {
      options.push(
        <SpellFactorSelectionListItem
          {...props}
          key={
            SpellFactorSelectionListItem + props.spellFactor.spellFactorType + i
          }
          value={i + 1}
          didSelectValue={this.onValueChange}
        />,
      );
    }

    return (
      <View style={style.container}>
        <RadioButton.Group
          value={factor.value + ''}
          onValueChange={this.onStringValueChange}>
          {options}
        </RadioButton.Group>
      </View>
    );
  }
}

export type SpellFactorSelectionListStyle = {
  container: ViewStyle;

  optionContainer: ViewStyle;
  optionLabel: ViewStyle;
};

export const style = StyleSheet.create<SpellFactorSelectionListStyle>({
  container: {},
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  optionLabel: {maxWidth: '80%'},
});

export type SpellFactorSelectionListItemProps = {
  spellFactor: SpellFactor;
  highestArcanumValue: number;
  primaryFactor: SpellFactorType;
  gnosis: number;
  value: number;
  didSelectValue: (value: number) => void;
};

export class SpellFactorSelectionListItem extends PureComponent<
  SpellFactorSelectionListItemProps
> {
  onSelect = () => {
    this.props.didSelectValue(this.props.value);
  };

  render() {
    const props = this.props;
    const factor = props.spellFactor;

    const label = spellFactorLabel(
      factor.spellFactorType,
      factor.level,
      props.value,
      props.gnosis,
      props.primaryFactor,
      props.highestArcanumValue,
    );

    return (
      <TouchableOpacity style={style.optionContainer} onPress={this.onSelect}>
        <Text style={style.optionLabel}>{label}</Text>
        <RadioButton value={props.value + ''} />
      </TouchableOpacity>
    );
  }
}
