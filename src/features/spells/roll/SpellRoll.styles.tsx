import {ViewStyle, StyleSheet, TextStyle} from 'react-native';
import {Theme} from 'react-native-paper';

export type SpellRollScreenStyle = {
  container: ViewStyle;
  spellItemWrapper: ViewStyle;
  spellItemActionContainer: ViewStyle;
  formContainer: ViewStyle;
  inputContainer: ViewStyle;
  selectedButton: ViewStyle;
  rollDiceButtonStyle: ViewStyle;
  spellFactorStyle: TextStyle;
  headerIconContainer: ViewStyle;
  rollButton: ViewStyle;
  section: ViewStyle;
};

export const makeSpellRollScreenStyle = (theme: Theme) =>
  StyleSheet.create<SpellRollScreenStyle>({
    container: {
      backgroundColor: theme.colors.background,
    },
    spellItemWrapper: {
      paddingVertical: 0,
    },
    spellItemActionContainer: {
      justifyContent: 'center',
      alignItems: 'flex-end',
      marginTop: 3,
      flex: 1,
    },
    formContainer: {
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    inputContainer: {
      marginBottom: 20,
    },
    selectedButton: {
      backgroundColor: theme.colors.primary,
    },
    rollDiceButtonStyle: {
      marginTop: 10,
      marginBottom: 20,
    },
    spellFactorStyle: {fontSize: 10},
    headerIconContainer: {paddingRight: 15},
    rollButton: {
      marginBottom: 20,
    },
    section: {width: '100%', marginTop: 0},
  });
