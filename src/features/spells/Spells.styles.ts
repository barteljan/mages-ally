import {StyleSheet, ViewStyle} from 'react-native';
import {Theme} from 'react-native-paper';

export type SpellsStyle = {
  container: ViewStyle;
  contentContainerStyle: ViewStyle;
  emptyComponentContainer: ViewStyle;
  emptyComponentText: ViewStyle;
  list: ViewStyle;
  swipeBackground: ViewStyle;
  delete: ViewStyle;
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
      alignItems: 'center',
      backgroundColor: theme.colors.error,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
    },
    delete: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 75,
      right: 0,
    },
  });
