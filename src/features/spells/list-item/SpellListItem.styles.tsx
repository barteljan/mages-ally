import {ViewStyle, TextStyle} from 'react-native';
import {Theme} from 'react-native-paper';

export type SpellListItemStyles = {
  wrapper: ViewStyle;
  container: ViewStyle;
  titleContainer: ViewStyle;
  title: TextStyle;
  subTitle: TextStyle;
  spellFactorContainer: ViewStyle;
  surface: ViewStyle;
  spellInformationContainer: ViewStyle;
  spellInformationText: TextStyle;
  spellFactorSectionDescriptionLabel: TextStyle;
};

export const makeSpellListItemStyles = (theme: Theme): SpellListItemStyles => {
  return {
    wrapper: {
      paddingVertical: 10,
    },
    container: {},
    titleContainer: {
      paddingTop: 15,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: 2,
      flexWrap: 'wrap',
      paddingHorizontal: 15,
    },
    title: {
      color: theme.colors.primary,
      fontSize: 18,
      fontWeight: 'bold',
    },
    subTitle: {
      marginTop: 3,
      fontSize: 12,
      color: theme.colors.disabled,
    },
    spellFactorContainer: {
      paddingBottom: 20,
    },
    surface: {
      elevation: 3,
    },
    spellInformationContainer: {paddingVertical: 5},
    spellInformationText: {fontSize: 11},
    spellFactorSectionDescriptionLabel: {fontSize: 14},
  };
};
