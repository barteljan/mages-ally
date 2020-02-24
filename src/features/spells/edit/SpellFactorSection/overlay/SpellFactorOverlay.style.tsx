import {ViewStyle, StyleSheet} from 'react-native';
import {Theme} from 'react-native-paper';

export type SpellFactorOverlayStyle = {
  container: ViewStyle;
  content: ViewStyle;
  selectedButton: ViewStyle;
};

export const makeSpellFactorOverlayStyle = (
  theme: Theme,
): SpellFactorOverlayStyle =>
  StyleSheet.create<SpellFactorOverlayStyle>({
    container: {paddingVertical: 20},
    content: {marginHorizontal: 20},
    selectedButton: {
      backgroundColor: theme.colors.accent,
    },
  });
