import {ViewStyle, TextStyle, StyleSheet} from 'react-native';
import {Theme} from 'react-native-paper';

export type YantraSelectRowStyle = {
  yantraContainer: ViewStyle;
  itemContainer: ViewStyle;
  title: TextStyle;
  titleRow: ViewStyle;
  description: TextStyle;
  notLastRow: ViewStyle;
  lastRow: ViewStyle;
};

export const makeYantraSelectRowStyle = (theme: Theme) =>
  StyleSheet.create<YantraSelectRowStyle>({
    yantraContainer: {
      backgroundColor: theme.colors.background,
      paddingHorizontal: 15,
    },
    itemContainer: {
      borderColor: theme.colors.primary,
      //borderBottomWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      backgroundColor: theme.colors.surface,
    },
    titleRow: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    title: {
      maxWidth: '70%',
      fontSize: 16,
      color: theme.colors.primary,
    },
    description: {
      maxWidth: '80%',
      paddingHorizontal: 15,
      paddingTop: 2,
      paddingBottom: 10,
      color: theme.colors.text,
    },
    notLastRow: {},
    lastRow: {
      borderBottomWidth: 1,
      borderBottomLeftRadius: theme.roundness,
      borderBottomRightRadius: theme.roundness,
    },
  });
