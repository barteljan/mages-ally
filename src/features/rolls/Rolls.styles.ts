import {StyleSheet, ViewStyle} from 'react-native';
import {Theme} from 'react-native-paper';

export type RollsStyle = {
  container: ViewStyle;
  contentContainerStyle: ViewStyle;
  emptyComponentContainer: ViewStyle;
  emptyComponentText: ViewStyle;
  list: ViewStyle;
};

export const makeRollsStyle = (theme: Theme) =>
  StyleSheet.create<RollsStyle>({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    contentContainerStyle: {
      minHeight: '50%',
    },
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
  });
