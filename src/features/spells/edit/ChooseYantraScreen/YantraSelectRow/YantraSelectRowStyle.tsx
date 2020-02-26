import {ViewStyle, TextStyle, StyleSheet} from 'react-native';
import {Theme} from 'react-native-paper';

export type YantraSelectRowStyle = {
  yantraContainer: ViewStyle;
  itemContainer: ViewStyle;
  title: TextStyle;
  titleRow: ViewStyle;
  description: TextStyle;
};

export const makeYantraSelectRowStyle = (theme: Theme) =>
  StyleSheet.create<YantraSelectRowStyle>({
    yantraContainer: {
      backgroundColor: theme.colors.background,
      paddingHorizontal: 15,
    },
    itemContainer: {
      borderLeftColor: theme.colors.disabled,
      borderLeftWidth: 1,
      borderRightColor: theme.colors.disabled,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.disabled,
    },
    titleRow: {
      paddingHorizontal: 15,
      height: 44,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      backgroundColor: theme.colors.background,
    },
    title: {
      maxWidth: '70%',
      fontSize: 16,
    },
    description: {
      paddingHorizontal: 15,
      paddingVertical: 15,
      backgroundColor: theme.colors.background,
    },
  });
