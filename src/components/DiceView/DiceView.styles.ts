import {Colors} from '../../layout/Colors';
import {StyleSheet, ViewStyle, ImageStyle, TextStyle} from 'react-native';

export interface DiceViewStyles {
  touchable: ViewStyle;
  image: ImageStyle;
  diceText: TextStyle;
  diceTextOneDigit: TextStyle;
  diceTextTwoDigits: TextStyle;
  diceTextThreeDigits: TextStyle;
}

export const diceViewStyles = StyleSheet.create<DiceViewStyles>({
  touchable: {},
  image: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
    tintColor: Colors.disabled,
  },
  diceText: {
    position: 'absolute',
    top: 26,
    fontSize: 18,
    fontFamily: 'Arial',
    color: Colors.disabled,
  },
  diceTextOneDigit: {left: 26},
  diceTextTwoDigits: {left: 22},
  diceTextThreeDigits: {left: 22, fontSize: 12, top: 32},
});
