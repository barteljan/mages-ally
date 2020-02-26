import {ViewStyle, StyleSheet} from 'react-native';
import {Theme} from 'react-native-paper';

export type YantraSectionStyle = {
  selectedButton: ViewStyle;
};

export const makeYantraSectionStyle = (theme: Theme) =>
  StyleSheet.create({
    selectedButton: {
      backgroundColor: theme.colors.primary,
    },
  });
