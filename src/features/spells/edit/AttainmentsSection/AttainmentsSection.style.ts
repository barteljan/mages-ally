import {ViewStyle, StyleSheet} from 'react-native';
import {Theme} from 'react-native-paper';

export type AttainmentsSectionStyle = {
  selectedButton: ViewStyle;
};

export const makeAttainmentsSectionStyle = (theme: Theme) =>
  StyleSheet.create({
    selectedButton: {
      backgroundColor: theme.colors.primary,
    },
  });
