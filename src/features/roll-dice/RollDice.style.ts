import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {FontSize} from '../../layout/Font';
import {Theme} from 'react-native-paper';

export type RollDiceStyle = {
  container: ViewStyle;
  containerContent: ViewStyle;
  title: TextStyle;
  optionsTitle: TextStyle;
  selectedButtonStyle: ViewStyle;
  buttonGroupStyle: ViewStyle;
  rollDiceButtonStyle: ViewStyle;
  rollDiceButtonTextStyle: TextStyle;
};

export const makeRollDiceStyle = (theme: Theme) =>
  StyleSheet.create<RollDiceStyle>({
    container: {
      flex: 1,
      paddingVertical: 15,
      paddingHorizontal: 15,
      backgroundColor: theme.colors.background,
    },
    containerContent: {
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    title: {
      fontSize: FontSize.header,
      fontFamily: theme.fonts.regular.fontFamily,
      fontWeight: theme.fonts.regular.fontWeight,
      color: theme.colors.disabled,
      marginBottom: 15,
    },
    optionsTitle: {
      fontSize: FontSize.header,
      fontFamily: theme.fonts.regular.fontFamily,
      fontWeight: theme.fonts.regular.fontWeight,
      color: theme.colors.disabled,
      marginBottom: 15,
    },
    selectedButtonStyle: {
      backgroundColor: theme.colors.primary,
    },
    buttonGroupStyle: {
      marginBottom: 30,
    },
    rollDiceButtonStyle: {
      marginBottom: 15,
    },
    rollDiceButtonTextStyle: {
      color: theme.colors.primary,
      fontFamily: theme.fonts.medium.fontFamily,
      fontSize: FontSize.button,
      fontWeight: 'bold',
      marginBottom: 20,
    },
  });
