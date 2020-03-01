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

export const makeDiceViewStyles = (theme: Theme, scale: number) =>
  StyleSheet.create<DiceViewStyles>({
    touchable: {},
    image: {
      width: 64 * scale,
      height: 64 * scale,
      resizeMode: 'contain',
      tintColor: theme.colors.primary,
    },
    diceText: {
      position: 'absolute',

      fontSize: 16 * scale,
      fontFamily: 'Arial',
      color: theme.colors.background,
    },
    diceTextOneDigit: {left: 27 * scale, top: 18 * scale},
    diceTextTwoDigits: {
      left: 24 * scale,
      fontSize: 13 * scale,
      top: 20.5 * scale,
    },
    diceTextThreeDigits: {
      left: 22 * scale,
      fontSize: 12 * scale,
      top: 32 * scale,
    },
  });
