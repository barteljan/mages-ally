import {StyleSheet, ViewStyle, ImageStyle, TextStyle} from 'react-native';
import {Theme} from 'react-native-paper';

export type DiceViewStyles = {
  touchable: ViewStyle;
  image: ImageStyle;
  diceText: TextStyle;
  diceTextOneDigit: TextStyle;
  diceTextTwoDigits: TextStyle;
  diceTextThreeDigits: TextStyle;
};

export const makeDiceViewStyles = (theme: Theme) =>
  StyleSheet.create<DiceViewStyles>({
    touchable: {},
    image: {
      width: 64,
      height: 64,
      resizeMode: 'contain',
      tintColor: theme.colors.disabled,
    },
    diceText: {
      position: 'absolute',
      top: 26,
      fontSize: 18,
      fontFamily: 'Arial',
      color: theme.colors.disabled,
    },
    diceTextOneDigit: {left: 26},
    diceTextTwoDigits: {left: 22},
    diceTextThreeDigits: {left: 22, fontSize: 12, top: 32},
  });
