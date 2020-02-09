import React from 'react';
import {Text, Image, TextStyle} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {diceViewStyles} from './DiceView.styles';
import {DiceViewProps} from './DiceView.props';

export class DiceView extends React.PureComponent<DiceViewProps> {
  render() {
    let additionalStyle: TextStyle = {};
    if (this.props.index < 10) {
      additionalStyle = diceViewStyles.diceTextOneDigit;
    } else if (this.props.index < 100) {
      additionalStyle = diceViewStyles.diceTextTwoDigits;
    } else {
      additionalStyle = diceViewStyles.diceTextThreeDigits;
    }

    let text = (
      <Text
        style={[
          diceViewStyles.diceText,
          additionalStyle,
          this.props.diceTextStyle,
        ]}>
        {this.props.index}
      </Text>
    );

    return (
      <TouchableWithoutFeedback
        style={[diceViewStyles.touchable, this.props.containerStyle]}
        onPress={() =>
          this.props.onPress ? this.props.onPress(this.props.index) : ''
        }>
        <Image
          style={[diceViewStyles.image, this.props.diceImageStyle]}
          source={require('../../ressources/images/d10.png')}
        />
        {text}
      </TouchableWithoutFeedback>
    );
  }
}
