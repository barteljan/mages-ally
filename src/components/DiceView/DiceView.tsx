import React from 'react';
import {Text, Image, TextStyle} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {DiceViewStyles, makeDiceViewStyles} from './DiceView.styles';
import {DiceViewProps} from './DiceView.props';
import {withTheme} from 'react-native-paper';
import {DynamiclyStyledPureComponent} from '../DynamiclyStyledPureComponent';

type DiceViewState = {
  styles: DiceViewStyles;
};

class _DiceView extends DynamiclyStyledPureComponent<
  DiceViewProps,
  DiceViewStyles,
  DiceViewState
> {
  makeStyle() {
    return makeDiceViewStyles(this.props.theme);
  }

  render() {
    let additionalStyle: TextStyle = {};
    if (this.props.index < 10) {
      additionalStyle = this.state.styles.diceTextOneDigit;
    } else if (this.props.index < 100) {
      additionalStyle = this.state.styles.diceTextTwoDigits;
    } else {
      additionalStyle = this.state.styles.diceTextThreeDigits;
    }

    let text = (
      <Text
        style={[
          this.state.styles.diceText,
          additionalStyle,
          this.props.diceTextStyle,
        ]}>
        {this.props.index}
      </Text>
    );

    return (
      <TouchableWithoutFeedback
        style={[this.state.styles.touchable, this.props.containerStyle]}
        onPress={() =>
          this.props.onPress ? this.props.onPress(this.props.index) : ''
        }>
        <Image
          style={[this.state.styles.image, this.props.diceImageStyle]}
          source={require('../../ressources/images/d10.png')}
        />
        {text}
      </TouchableWithoutFeedback>
    );
  }
}

export const DiceView = withTheme(_DiceView);
