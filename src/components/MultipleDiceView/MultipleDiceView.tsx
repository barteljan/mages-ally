import React from 'react';
import {View} from 'react-native';
import {DynamiclyStyledPureComponent} from '../DynamiclyStyledPureComponent';
import {DiceView} from '../DiceView/DiceView';
import {makeMultipleDiceViewStyles} from './MultipleDiceView.styles';
import {MultipleDiceViewStyles} from '././MultipleDiceView.styles';
import {MultipleDiceViewProps} from './MultipleDiceView.props';

export class MultipleDiceView extends DynamiclyStyledPureComponent<
  MultipleDiceViewProps,
  MultipleDiceViewStyles
> {
  makeStyle(): MultipleDiceViewStyles {
    return makeMultipleDiceViewStyles(this.props.theme);
  }
  sortNumber(a: number, b: number) {
    return (a - b) * -1;
  }
  render() {
    const styles = this.state.styles;
    let dicesValues = [...this.props.dices].sort(this.sortNumber);
    let dices: Element[] = [];
    let index = 0;
    dicesValues.forEach(dice => {
      index++;
      dices.push(
        <DiceView
          key={index + '_MultipleDiceView_' + this.props.parent}
          scale={0.75}
          theme={this.props.theme}
          index={dice}
          diceImageStyle={
            dice >= this.props.difficulty
              ? styles.successDice
              : styles.failureDice
          }
        />,
      );
    });
    return (
      <View style={[styles.container, this.props.containerStyle]}>{dices}</View>
    );
  }
}
