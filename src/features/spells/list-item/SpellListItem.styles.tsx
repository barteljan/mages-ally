import {ViewStyle, TextStyle} from 'react-native';
import {Theme} from 'react-native-paper';

export type SpellListItemStyles = {
  wrapper: ViewStyle;
  container: ViewStyle;
  titleRow: ViewStyle;
  titleContainer: ViewStyle;
  title: TextStyle;
  subTitle: TextStyle;
  actionWrapper: ViewStyle;
  spellFactorContainer: ViewStyle;
  surface: ViewStyle;
  spellInformationContainer: ViewStyle;
  spellInformationText: TextStyle;
  spellFactorSectionDescriptionLabel: TextStyle;
};

export const makeSpellListItemStyles = (
  theme: Theme,
  spellFactorStyle: TextStyle | undefined,
  hidesDescription: boolean,
): SpellListItemStyles => {
  return {
    wrapper: {
      paddingVertical: 10,
    },
    container: {},
    titleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    titleContainer: {
      paddingTop: 15,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: 2,
      flexWrap: 'wrap',
      paddingHorizontal: 15,
      maxWidth: '90%',
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
    actionWrapper: {
      right: 10,
      top: 10,
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
    spellFactorContainer: {
      paddingBottom: hidesDescription ? 0 : 20,
    },
    surface: {
      elevation: 3,
    },
    spellInformationContainer: {paddingVertical: 5},
    spellInformationText: {fontSize: 11},
    spellFactorSectionDescriptionLabel: {fontSize: 14, ...spellFactorStyle},
  };
};
