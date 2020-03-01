import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {Theme} from 'react-native-paper';

export type NumberSwitchStyles = {
  viewContainer: ViewStyle;
  inputIOS: TextStyle;
};

export const makeNumberSwitchStyles = (theme: Theme) =>
  StyleSheet.create<NumberSwitchStyles>({
    viewContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingLeft: 15,
    },
    inputIOS: {
      color: theme.colors.text,
    },
  });
