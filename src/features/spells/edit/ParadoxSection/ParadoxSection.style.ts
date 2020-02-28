import {ViewStyle, StyleSheet} from 'react-native';
import {Theme} from 'react-native-paper';

export type ParadoxSectionStyle = {
  selectedButton: ViewStyle;
};

export const makeSpellSectionStyle = (theme: Theme) =>
  StyleSheet.create({
    selectedButton: {
      backgroundColor: theme.colors.primary,
    },
  });
