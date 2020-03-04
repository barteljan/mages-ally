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
  diceRollWrapper: ViewStyle;
  diceRollTitle: ViewStyle;
  headerIconContainer: ViewStyle;
};

export const makeRollDiceStyle = (theme: Theme) =>
  StyleSheet.create<RollDiceStyle>({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    containerContent: {
      paddingHorizontal: 15,
      paddingBottom: 15,
    },
    diceSelectContainer: {
      marginTop: 20,
      paddingTop: 20,
      paddingHorizontal: 15,
    },
    inputContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
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
    diceRollWrapper: {paddingTop: 0, paddingBottom: 15},
    diceRollTitle: {fontSize: 16},
    headerIconContainer: {paddingRight: 15},
  });
