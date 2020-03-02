import React from 'react';
import {View, LayoutAnimation, Platform, UIManager} from 'react-native';
import {DynamiclyStyledPureComponent} from '../DynamiclyStyledPureComponent';
import {DiceView} from '../DiceView/DiceView';
import {makeMultipleDiceViewStyles} from './MultipleDiceView.styles';
import {MultipleDiceViewStyles} from '././MultipleDiceView.styles';
import {MultipleDiceViewProps} from './MultipleDiceView.props';
import {shallowEqual} from 'react-redux';

export class MultipleDiceView extends DynamiclyStyledPureComponent<
  MultipleDiceViewProps,
  MultipleDiceViewStyles
> {
  constructor(props: MultipleDiceViewProps) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  makeStyle(): MultipleDiceViewStyles {
    return makeMultipleDiceViewStyles(this.props.theme);
  }
  sortNumber(a: number, b: number) {
    return (a - b) * -1;
  }

  componentDidUpdate(prevProps: MultipleDiceViewProps) {
    super.componentDidUpdate(prevProps);
    if (!shallowEqual(prevProps.dices, this.props.dices)) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    }
  }

  render() {
    const styles = this.state.styles;
    let dicesValues = [...this.props.dices].sort(this.sortNumber);
    let dices: Element[] = [];
    let index = 0;
    const scaleDice = this.props.scaleDice ? this.props.scaleDice : 0.75;
    dicesValues.forEach(dice => {
      index++;
      dices.push(
        <DiceView
          key={index + '_MultipleDiceView_' + this.props.parent}
          scale={scaleDice}
          theme={this.props.theme}
          index={dice}
          onPress={this.props.onPress}
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
