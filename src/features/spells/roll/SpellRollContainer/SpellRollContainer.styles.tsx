import {ViewStyle, StyleSheet} from 'react-native';
import {Theme} from 'react-native-paper';
import {MarkdownProps} from 'react-native-markdown-renderer';

export type BasicSpellRollContainerStyles = {
  container: ViewStyle;
  titleRow: ViewStyle;
  titleContainer: ViewStyle;
  diceContainer: ViewStyle;
};

export type SpellRollContainerStyles = BasicSpellRollContainerStyles & {
  rollTitle: MarkdownProps['style'];
};

export const makeSpellRollContainerStyles = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  theme: Theme,
): SpellRollContainerStyles => {
  const basicStyle = StyleSheet.create<BasicSpellRollContainerStyles>({
    container: {},
    titleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    titleContainer: {maxWidth: '90%'},
    diceContainer: {paddingBottom: 10, paddingTop: 0},
  });

  const rollTitle: MarkdownProps['style'] = {
    text: {
      fontSize: 12,
    },
    strong: {
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
  };

  return {...basicStyle, rollTitle};
};
