import {ViewStyle, TextStyle, StyleSheet} from 'react-native';
import {Theme} from 'react-native-paper';
import {MarkdownProps} from 'react-native-markdown-renderer';

export type BasicSpellRollInfoStyles = {
  wrapper: ViewStyle;
  container: ViewStyle;
  titleRow: ViewStyle;
  titleContainer: ViewStyle;
  title: TextStyle;
  rollContainer: ViewStyle;
  paradoxRollContainer: ViewStyle;
  containParadoxRollContainer: ViewStyle;
  spellRollContainer: ViewStyle;
  releaseParadoxContainer: ViewStyle;
  collapseIcon: ViewStyle;
};

export type SpellRollInfoStyles = BasicSpellRollInfoStyles & {
  releaseParadoxDescription: MarkdownProps['style'];
};

export const makeSpellRollInfoStyles = (theme: Theme): SpellRollInfoStyles => {
  const basicStyles = StyleSheet.create<BasicSpellRollInfoStyles>({
    wrapper: {paddingTop: 15},
    container: {
      overflow: 'hidden',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.roundness,
    },
    titleRow: {
      flexDirection: 'row',
      width: '100%',
      backgroundColor: theme.colors.primary,
    },
    titleContainer: {
      paddingHorizontal: 15,
      padding: 5,
      backgroundColor: theme.colors.primary,
      right: 30,
      paddingLeft: 60,
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
      paddingVertical: 5,
      borderBottomColor: theme.colors.primary,
      borderBottomWidth: 0.5,
    },
    paradoxRollContainer: {},
    containParadoxRollContainer: {},
    spellRollContainer: {},
    releaseParadoxContainer: {paddingHorizontal: 15},
    collapseIcon: {right: 15},
  });

  const releaseParadoxDescription: MarkdownProps['style'] = {
    text: {fontSize: 12},
    strong: {
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
  };

  return {...basicStyles, releaseParadoxDescription};
};
