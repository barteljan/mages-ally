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
      tintColor: theme.colors.primary,
    },
    diceText: {
      position: 'absolute',

      fontSize: 16,
      fontFamily: 'Arial',
      color: theme.colors.background,
    },
    diceTextOneDigit: {left: 27, top: 18},
    diceTextTwoDigits: {left: 24, fontSize: 13, top: 20.5},
    diceTextThreeDigits: {left: 22, fontSize: 12, top: 32},
  });
