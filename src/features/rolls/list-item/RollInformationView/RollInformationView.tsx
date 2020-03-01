import React from 'react';
import {View, Text} from 'react-native';
import {DynamiclyStyledPureComponent} from '../../../../components/DynamiclyStyledPureComponent';
import {localization} from '../RollItem.strings';
import {DiceRollOutcome} from '../../../../rules/dice-roll/DiceRoll.outcome';
import {
  RollInformationViewStyles,
  makeRollInformationViewStyles,
} from './RollInformationView.styles';
import {RollInformationViewProps} from './RollInformationView.props';

export class RollInformationView extends DynamiclyStyledPureComponent<
  RollInformationViewProps,
  RollInformationViewStyles
> {
  makeStyle() {
    return makeRollInformationViewStyles(this.props.theme);
  }
  render() {
    const roll = this.props.roll;
    const config = roll.configuration;
    let outcome = '';
    switch (roll.outcome) {
      case DiceRollOutcome.exceptionalSuccess:
        outcome += localization.exceptional_success;
        break;
      case DiceRollOutcome.dramaticFailure:
        outcome += localization.dramatic_failure;
        break;
      case DiceRollOutcome.failure:
        outcome += localization.failure;
        break;
      case DiceRollOutcome.success:
        outcome += localization.success;
    }
    let rollAgain = '';
    if (config.explodeFor.includes(8)) {
      rollAgain += localization.eightAgain;
    } else if (config.explodeFor.includes(9)) {
      rollAgain += localization.nineAgain;
    } else if (config.explodeFor.includes(10)) {
      rollAgain += localization.tenAgain;
    } else {
      rollAgain += localization.roteQuality;
    }
    return (
      <View
        style={[
          this.state.styles.container,
          roll.outcome === DiceRollOutcome.failure ||
          roll.outcome === DiceRollOutcome.dramaticFailure
            ? this.state.styles.failureContainer
            : this.state.styles.container,
          this.props.containerStyle,
        ]}>
        <Text style={[this.state.styles.text, this.props.textStyle]}>
          {outcome}
        </Text>
        <Text style={[this.state.styles.text, this.props.textStyle]}>
          {rollAgain}
        </Text>
      </View>
    );
  }
}
