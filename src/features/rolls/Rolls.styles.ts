import {StyleSheet, ViewStyle} from 'react-native';
import {Theme} from 'react-native-paper';

export type RollsStyle = {
  container: ViewStyle;
  list: ViewStyle;
};

export const makeRollsStyle = (theme: Theme) =>
  StyleSheet.create<RollsStyle>({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    list: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });
