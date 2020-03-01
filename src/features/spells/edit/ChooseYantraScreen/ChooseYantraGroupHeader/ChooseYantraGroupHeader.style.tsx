import {TextStyle, ViewStyle, StyleSheet} from 'react-native';
import {Theme} from 'react-native-paper';

export type ChooseYantraGroupHeaderStyle = {
  container: ViewStyle;
  contentContainer: ViewStyle;
  label: TextStyle;
};

export const makeChooseYantraGroupHeaderStyle = (theme: Theme) =>
  StyleSheet.create<ChooseYantraGroupHeaderStyle>({
    container: {
      paddingTop: 20,
      paddingHorizontal: 15,
      backgroundColor: theme.colors.background,
    },
    contentContainer: {
      paddingHorizontal: 15,
      height: 52,
      justifyContent: 'center',
      alignItems: 'flex-start',
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      elevation: 2,
      borderColor: theme.colors.primary,
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
    },
    label: {
      fontSize: 18,
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
  });
