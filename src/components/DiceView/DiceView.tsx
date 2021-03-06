import React from 'react';
import {Text, Image, TextStyle, TouchableOpacity} from 'react-native';
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
    const scale = this.props.scale ? this.props.scale : 1;
    return makeDiceViewStyles(this.props.theme, scale);
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
      <TouchableOpacity
        activeOpacity={this.props.activeOpacity ? this.props.activeOpacity : 1}
        style={[this.state.styles.touchable, this.props.containerStyle]}
        onPress={() =>
          this.props.onPress ? this.props.onPress(this.props.index) : ''
        }>
        <Image
          style={[this.state.styles.image, this.props.diceImageStyle]}
          source={require('../../ressources/images/d10_dark.png')}
        />
        {text}
      </TouchableOpacity>
    );
  }
}

export const DiceView = withTheme(_DiceView);
