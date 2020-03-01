import {ViewStyle, TextStyle, StyleSheet} from 'react-native';
import {Theme} from 'react-native-paper';

export type RollInformationViewStyles = {
  container: ViewStyle;
  failureContainer: ViewStyle;
  infoContainer: ViewStyle;
  text: TextStyle;
};

export const makeRollInformationViewStyles = (theme: Theme) =>
  StyleSheet.create<RollInformationViewStyles>({
    container: {
      paddingHorizontal: 15,
      paddingVertical: 5,
      backgroundColor: theme.colors.primary,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    failureContainer: {
      backgroundColor: theme.colors.error,
    },
    infoContainer: {marginRight: 10},
    text: {color: theme.colors.background, fontSize: 11},
  });
