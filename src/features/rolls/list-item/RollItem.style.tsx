import {ViewStyle, TextStyle, StyleSheet} from 'react-native';
import {Theme} from 'react-native-paper';

export type RollItemStyle = {
  wrapper: ViewStyle;
  container: ViewStyle;
  surface: ViewStyle;
  headerRow: ViewStyle;
  titleContainer: ViewStyle;
  title: TextStyle;
  subTitle: TextStyle;
  dices: ViewStyle;
  iconContainer: ViewStyle;
};

export const makeRollItemStyle = (theme: Theme) =>
  StyleSheet.create<RollItemStyle>({
    wrapper: {
      paddingVertical: 15,
    },
    container: {},
    surface: {
      elevation: 3,
    },
    headerRow: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 15,
      paddingVertical: 10,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexWrap: 'wrap',
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
    dices: {
      paddingHorizontal: 9,
      paddingBottom: 15,
    },
    iconContainer: {
      paddingBottom: 15,
      paddingLeft: 15,
      paddingRight: 5,
      //backgroundColor: 'green',
    },
  });
