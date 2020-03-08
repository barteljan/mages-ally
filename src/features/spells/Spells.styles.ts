import {StyleSheet, ViewStyle} from 'react-native';
import {Theme} from 'react-native-paper';

export type SpellsStyle = {
  container: ViewStyle;
  contentContainerStyle: ViewStyle;
  emptyComponentContainer: ViewStyle;
  emptyComponentText: ViewStyle;
  list: ViewStyle;
  swipeBackground: ViewStyle;
};

export const makeSpellsStyle = (theme: Theme) =>
  StyleSheet.create<SpellsStyle>({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    contentContainerStyle: {minHeight: '50%', paddingTop: 10},
    list: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    emptyComponentContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    emptyComponentText: {
      color: theme.colors.disabled,
    },
    swipeBackground: {
      marginVertical: 10,
    },
  });
