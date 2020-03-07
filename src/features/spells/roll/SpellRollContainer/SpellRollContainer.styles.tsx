import {ViewStyle, TextStyle, StyleSheet} from 'react-native';
import {Theme} from 'react-native-paper';

export type SpellRollContainerStyles = {
  container: ViewStyle;
  titleContainer: ViewStyle;
  rollTitle: TextStyle;
  diceRollInfo: ViewStyle;
  infoText: TextStyle;
};

export const makeSpellRollContainerStyles = (theme: Theme) =>
  StyleSheet.create<SpellRollContainerStyles>({
    container: {},
    titleContainer: {},
    rollTitle: {
      fontSize: 12,
    },
    diceRollInfo: {
      backgroundColor: theme.colors.disabled,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      paddingVertical: 5,
    },
    infoText: {
      color: theme.colors.background,
      fontSize: 11,
    },
  });
