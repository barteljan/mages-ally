import {ViewStyle, TextStyle, StyleSheet} from 'react-native';
import {Theme} from 'react-native-paper';

export type SpellSectionDescriptionStyle = {
  container: ViewStyle;
  infoContainer: ViewStyle;
  label: TextStyle;
};

export const makeSpellSectionDescriptionStyle = (theme: Theme) =>
  StyleSheet.create<SpellSectionDescriptionStyle>({
    container: {
      width: '100%',
      paddingHorizontal: 15,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginRight: 10,
      marginTop: 5,
    },
    label: {
      fontSize: 10,
      color: theme.colors.disabled,
      flexWrap: 'wrap',
    },
  });
