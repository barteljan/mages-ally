import React from 'react';
import {View, Text} from 'react-native';
import {DynamiclyStyledPureComponent} from '../../../components/DynamiclyStyledPureComponent';
import {SpellInformationProps} from './SpellInformation.props';
import {
  SpellInformationStyle,
  makeSpellInformationStyle,
} from './SpellInformation.style';
import {withTheme} from 'react-native-paper';

export class _SpellInformation extends DynamiclyStyledPureComponent<
  SpellInformationProps,
  SpellInformationStyle
> {
  makeStyle() {
    return makeSpellInformationStyle(this.props.theme);
  }

  render() {
    const spell = this.props.spell;
    const roll = spell.roll;
    return (
      <View style={this.state.styles.container}>
        <View style={this.state.styles.infoContainer}>
          <Text style={this.state.styles.text}>
            {'Dice: ' + roll.dices.number}
          </Text>
        </View>
        <View style={this.state.styles.infoContainer}>
          <Text style={this.state.styles.text}>
            {'Reach: ' + spell.reaches.needed + '/' + spell.reaches.free}
          </Text>
        </View>
        <View style={this.state.styles.infoContainer}>
          <Text style={this.state.styles.text}>{'Mana: ' + spell.mana}</Text>
        </View>
        <View style={this.state.styles.infoContainer}>
          <Text style={this.state.styles.text}>
            {'Paradox-Dice: ' + roll.paradox.number}
          </Text>
        </View>
      </View>
    );
  }
}
export const SpellInformation = withTheme(_SpellInformation);
