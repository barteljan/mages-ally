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
import {Overlay, ButtonGroup} from 'react-native-elements';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Theme} from 'react-native-paper';

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
            {...this.props}
          />
        </InputContainer>
      </FormSection>
    );
  }
}

type SpellFactorRowProps = {
  type: SpellFactorType;
  value: number;
  level: SpellFactorLevel;
  gnosis: number;
  primaryFactor: SpellFactorType;
  highestArcanumValue: number;
  containerStyle?: ViewStyle;
  theme: Theme;
  parent: string;
  setSpellFactorLevel: (
    factor: SpellFactorType,
    level: SpellFactorLevel,
    parent: string,
  ) => void;
};

type SpellFactorRowState = {
  showOverlay: boolean;
};

class SpellFactorRow extends PureComponent<
  SpellFactorRowProps,
  SpellFactorRowState
> {
  state = {
    showOverlay: false,
  };

  onPress = () => {
    this.setState({showOverlay: true});
  };

  hideOverlay = () => {
    this.setState({showOverlay: false});
  };

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
      <TouchableWithoutFeedback
        style={[style.container, this.props.containerStyle]}
        onPress={this.onPress}>
        <Text style={style.label}>{label}</Text>
        <View style={style.level}>
          <Text>{spellFactorLevelName(this.props.level)}</Text>
        </View>
        <SpellFactorOverlay
          theme={this.props.theme}
          isVisible={this.state.showOverlay}
          factor={this.props.type}
          level={this.props.level}
          identifier={this.props.type}
          onBackdropPress={this.hideOverlay}
          {...this.props}
        />
      </TouchableWithoutFeedback>
    );
  }
}

type SpellFactorStyle = {
  container: ViewStyle;
  label: ViewStyle;
  level: ViewStyle;
};

let style = StyleSheet.create<SpellFactorStyle>({
  container: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  label: {
    maxWidth: '80%',
  },
  level: {
    minWidth: 60,
  },
});

type SpellfactorOverlayProps = {
  isVisible: boolean;
  theme: Theme;
  factor: SpellFactorType;
  level: SpellFactorLevel;
  identifier: string;
  parent: string;
  onBackdropPress: () => void;
  setSpellFactorLevel: (
    factor: SpellFactorType,
    level: SpellFactorLevel,
    parent: string,
  ) => void;
};

class SpellFactorOverlay extends DynamiclyStyledPureComponent<
  SpellfactorOverlayProps,
  SpellFactorOverlayStyle
> {
  makeStyle() {
    return makeSpellFactorOverlayStyle(this.props.theme);
  }
  buttons = [
    spellFactorLevelName(SpellFactorLevel.standard),
    spellFactorLevelName(SpellFactorLevel.advanced),
  ];

  indexFromLevel(level: SpellFactorLevel) {
    switch (level) {
      case SpellFactorLevel.standard:
        return 0;
      case SpellFactorLevel.advanced:
        return 1;
    }
  }

  switchTabs = (index: number) => {
    let level = SpellFactorLevel.standard;
    if (index === 1) {
      level = SpellFactorLevel.advanced;
    }
    this.props.setSpellFactorLevel(this.props.factor, level, this.props.parent);
  };

  render() {
    return (
      <Overlay
        isVisible={this.props.isVisible}
        onBackdropPress={this.props.onBackdropPress}>
        <ButtonGroup
          buttons={this.buttons}
          selectedIndex={this.indexFromLevel(this.props.level)}
          onPress={this.switchTabs}
          selectedButtonStyle={this.state.styles.selectedButton}
        />
      </Overlay>
    );
  }
}

type SpellFactorOverlayStyle = {
  selectedButton: ViewStyle;
};

const makeSpellFactorOverlayStyle = (theme: Theme): SpellFactorOverlayStyle =>
  StyleSheet.create<SpellFactorOverlayStyle>({
    selectedButton: {
      backgroundColor: theme.colors.accent,
    },
  });
