import React from 'react';
import {View, Text} from 'react-native';
import {DynamiclyStyledPureComponent} from '../../../../components/DynamiclyStyledPureComponent';
import {SpellRollContainerProps} from './SpellRollContainer.props';
import {
  SpellRollContainerStyles,
  makeSpellRollContainerStyles,
} from './SpellRollContainer.styles';
export class SpellRollContainer extends DynamiclyStyledPureComponent<
  SpellRollContainerProps,
  SpellRollContainerStyles
> {
  makeStyle() {
    return makeSpellRollContainerStyles(this.props.theme);
  }
  render() {
    const styles = this.state.styles;
    /*
    let numberOfDice = 0;
    if (this.props.roll) {
      for (let key in this.props.roll.configuration.modifiers) {
        numberOfDice += this.props.roll.configuration.modifiers[key];
      }
    }
 
    const info = (
      <View style={styles.diceRollInfo}>
        <Text style={styles.infoText}>
          {capitalize(localization.dice) + ': ' + numberOfDice}
        </Text>
        <Text style={styles.infoText}>
          {'Successes: ' + (this.props.roll ? this.props.roll.successes : 0)}
        </Text>
        <Text style={styles.infoText}>{'10 Again'}</Text>
      </View>
    );
       */
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <View style={styles.titleContainer}>
          <Text style={styles.rollTitle}>{this.props.title}</Text>
        </View>
      </View>
    );
  }
}
