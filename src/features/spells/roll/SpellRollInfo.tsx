import React from 'react';
import {Theme} from 'react-native-paper';
import {
  StyleSheet,
  View,
  Text,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import {DynamiclyStyledPureComponent} from '../../../components/DynamiclyStyledPureComponent';
import {SpellRollInfoConfig} from './SpellRollInfoConfig';
import {DiceRoll} from '../../../rules/dice-roll/DiceRoll';

export type SpellRollInfoProps = {
  theme: Theme;
  spellInformationConfig: SpellRollInfoConfig;
};

export type SpellRollInfoStyles = {
  wrapper: ViewStyle;
  container: ViewStyle;
  rollContainer: ViewStyle;
  paradoxRollContainer: ViewStyle;
  containParadoxRollContainer: ViewStyle;
  spellRollContainer: ViewStyle;
};

export const makeSpellRollInfoStyles = (theme: Theme) =>
  StyleSheet.create<SpellRollInfoStyles>({
    wrapper: {paddingVertical: 10},
    container: {
      borderWidth: 1,
      borderColor: theme.colors.primary,
      overflow: 'hidden',
    },
    rollContainer: {backgroundColor: theme.colors.surface},
    paradoxRollContainer: {},
    containParadoxRollContainer: {},
    spellRollContainer: {},
  });

export class SpellRollInfo extends DynamiclyStyledPureComponent<
  SpellRollInfoProps,
  SpellRollInfoStyles
> {
  makeStyle() {
    return makeSpellRollInfoStyles(this.props.theme);
  }

  render() {
    const paradoxRollContainer = this.props.spellInformationConfig
      .paradoxRoll ? (
      <SpellRollContainer
        theme={this.props.theme}
        roll={this.props.spellInformationConfig.paradoxRoll}
        containerStyle={[
          this.state.styles.rollContainer,
          this.state.styles.paradoxRollContainer,
        ]}
      />
    ) : null;

    const containParadoxRollContainer = this.props.spellInformationConfig
      .containParadoxRoll ? (
      <SpellRollContainer
        theme={this.props.theme}
        roll={this.props.spellInformationConfig.containParadoxRoll}
        containerStyle={[
          this.state.styles.rollContainer,
          this.state.styles.containParadoxRollContainer,
        ]}
      />
    ) : null;

    const spellRollContainer = this.props.spellInformationConfig.spellRoll ? (
      <SpellRollContainer
        theme={this.props.theme}
        roll={this.props.spellInformationConfig.spellRoll}
        containerStyle={[
          this.state.styles.rollContainer,
          this.state.styles.spellRollContainer,
        ]}
      />
    ) : null;

    return (
      <View style={this.state.styles.wrapper}>
        <View style={this.state.styles.container}>
          {paradoxRollContainer}
          {containParadoxRollContainer}
          {spellRollContainer}
        </View>
      </View>
    );
  }
}

export type SpellRollContainerProps = {
  theme: Theme;
  roll: DiceRoll;
  containerStyle?: StyleProp<ViewStyle>;
};
export type SpellRollContainerStyles = {
  container: ViewStyle;
  titleContainer: ViewStyle;
  rollTitle: TextStyle;
  diceRollInfo: ViewStyle;
  infoText: TextStyle;
};

export const makeSpellRollContainerStyles = (theme: Theme) =>
  StyleSheet.create<SpellRollContainerStyles>({
    container: {},
    titleContainer: {paddingHorizontal: 15, paddingVertical: 15},
    rollTitle: {},
    diceRollInfo: {
      backgroundColor: theme.colors.primary,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      paddingVertical: 5,
    },
    infoText: {
      color: theme.colors.background,
      fontSize: 11,
    },
  });

export class SpellRollContainer extends DynamiclyStyledPureComponent<
  SpellRollContainerProps,
  SpellRollContainerStyles
> {
  makeStyle() {
    return makeSpellRollContainerStyles(this.props.theme);
  }

  render() {
    let numberOfDice = 0;
    for (let key in this.props.roll.configuration.modifiers) {
      numberOfDice += this.props.roll.configuration.modifiers[key];
    }

    return (
      <View style={[this.state.styles.container, this.props.containerStyle]}>
        <View style={this.state.styles.titleContainer}>
          <Text style={this.state.styles.rollTitle}>
            {this.props.roll.title}
          </Text>
        </View>
        <View style={this.state.styles.diceRollInfo}>
          <Text style={this.state.styles.infoText}>
            {'Dice: ' + numberOfDice}
          </Text>
          <Text style={this.state.styles.infoText}>
            {'Successes: ' + this.props.roll.successes}
          </Text>
          <Text style={this.state.styles.infoText}>{'10 Again'}</Text>
        </View>
      </View>
    );
  }
}
