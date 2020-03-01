import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {FontSize} from '../../layout/Font';
import {Theme} from 'react-native-paper';

export type RollDiceStyle = {
  container: ViewStyle;
  containerContent: ViewStyle;
  diceSelectContainer: ViewStyle;
  inputContainer: ViewStyle;
  optionsTitle: TextStyle;
  selectedButtonStyle: ViewStyle;
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
      //alignItems: 'center',
      //justifyContent: 'flex-start',
    },
    diceSelectContainer: {
      paddingTop: 20,
    },
    inputContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    optionsTitle: {
      fontSize: FontSize.header,
      fontFamily: theme.fonts.regular.fontFamily,
      fontWeight: theme.fonts.regular.fontWeight,
      color: theme.colors.disabled,
      marginBottom: 20,
    },
    selectedButtonStyle: {
      backgroundColor: theme.colors.primary,
    },
    rollDiceButtonStyle: {
      marginVertical: 20,
    },
    rollDiceButtonTextStyle: {
      color: theme.colors.primary,
      fontFamily: theme.fonts.medium.fontFamily,
      fontSize: FontSize.button,
      fontWeight: 'bold',
      marginBottom: 20,
    },
  });
