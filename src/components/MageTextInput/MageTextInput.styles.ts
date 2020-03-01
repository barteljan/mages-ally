import {ViewStyle, StyleSheet} from 'react-native';
import {Theme} from 'react-native-paper';

export type MageTextInputStyles = {
  container: ViewStyle;
  inputField: ViewStyle;
};

export const makeMageTextInputStyles = (theme: Theme) =>
  StyleSheet.create<MageTextInputStyles>({
    container: {
      height: 52,
      width: '100%',
      marginBottom: 20,
      elevation: 3,
      padding: 0,
      backgroundColor: theme.colors.background,
    },
    inputField: {
      height: 52,
      width: '100%',
      top: -6,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.roundness,
    },
  });
