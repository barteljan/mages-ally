import {ViewStyle, TextStyle, StyleSheet} from 'react-native';
import {Theme} from 'react-native-paper';

export type SpellRollInfoStyles = {
  wrapper: ViewStyle;
  container: ViewStyle;
  titleContainer: ViewStyle;
  title: TextStyle;
  rollContainer: ViewStyle;
  paradoxRollContainer: ViewStyle;
  containParadoxRollContainer: ViewStyle;
  spellRollContainer: ViewStyle;
  releaseParadoxContainer: ViewStyle;
  releaseParadoxDescription: TextStyle;
};

export const makeSpellRollInfoStyles = (theme: Theme) =>
  StyleSheet.create<SpellRollInfoStyles>({
    wrapper: {paddingTop: 15},
    container: {
      overflow: 'hidden',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.roundness,
    },
    titleContainer: {
      paddingHorizontal: 15,
      padding: 5,
      backgroundColor: theme.colors.primary,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.surface,
    },
    title: {
      color: theme.colors.background,
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    rollContainer: {
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderBottomColor: theme.colors.primary,
      borderBottomWidth: 0.5,
    },
    paradoxRollContainer: {},
    containParadoxRollContainer: {},
    spellRollContainer: {},
    releaseParadoxContainer: {paddingHorizontal: 15},
    releaseParadoxDescription: {fontSize: 12},
  });
