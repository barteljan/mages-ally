import {ViewStyle, TextStyle, StyleSheet} from 'react-native';
import {Theme} from 'react-native-paper';

export type SpellInformationStyle = {
  container: ViewStyle;
  infoContainer: ViewStyle;
  text: TextStyle;
};

export const makeSpellInformationStyle = (
  theme: Theme,
): SpellInformationStyle => {
  return StyleSheet.create<SpellInformationStyle>({
    container: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      backgroundColor: theme.colors.primary,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    infoContainer: {marginRight: 10},
    text: {color: theme.colors.background},
  });
};
