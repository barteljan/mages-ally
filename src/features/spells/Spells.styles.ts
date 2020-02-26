import {StyleSheet, ViewStyle} from 'react-native';
import {Theme} from 'react-native-paper';

export type SpellsStyle = {
  container: ViewStyle;
  contentContainerStyle: ViewStyle;
  emptyComponentContainer: ViewStyle;
  emptyComponentText: ViewStyle;
  list: ViewStyle;
};

export const makeSpellsStyle = (theme: Theme) =>
  StyleSheet.create<SpellsStyle>({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    contentContainerStyle: {flex: 1},
    list: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    emptyComponentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyComponentText: {
      color: theme.colors.disabled,
    },
  });
