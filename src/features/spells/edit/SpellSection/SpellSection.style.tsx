import {ViewStyle, StyleSheet} from 'react-native';
import {Theme} from 'react-native-paper';

export type SpellSectionStyle = {
  selectedButton: ViewStyle;
};

export const makeSpellSectionStyle = (theme: Theme) =>
  StyleSheet.create({
    selectedButton: {
      backgroundColor: theme.colors.accent,
    },
  });
