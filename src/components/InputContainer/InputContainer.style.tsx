import {ViewStyle, StyleSheet} from 'react-native';
import {Theme} from 'react-native-paper';

export type InputContainerStyle = {
  container: ViewStyle;
  label: ViewStyle;
};

export const makeInputContainerStyle = (theme: Theme) =>
  StyleSheet.create<InputContainerStyle>({
    container: {
      width: '100%',
      justifyContent: 'center',
      height: 52,
      borderStyle: 'solid',
      borderColor: theme.colors.disabled,
      borderWidth: 1,
      borderRadius: 2,
      backgroundColor: theme.colors.background,
    },
    label: {
      color: theme.colors.disabled,
      position: 'absolute',
      left: 10,
      top: -8,
      fontSize: 11,
      paddingHorizontal: 3,
      paddingVertical: 0,
      backgroundColor: theme.colors.background,
    },
  });
