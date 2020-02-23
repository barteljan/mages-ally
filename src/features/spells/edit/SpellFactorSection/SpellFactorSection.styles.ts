import {ViewStyle, StyleSheet} from 'react-native';
import {Theme} from 'react-native-paper';

export type SpellFactorSectionStyle = {
  selectedButton: ViewStyle;
};

export const makeSpellFaktorSectionStyle = (theme: Theme) =>
  StyleSheet.create<SpellFactorSectionStyle>({
    selectedButton: {
      backgroundColor: theme.colors.accent,
    },
  });
