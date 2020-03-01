import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {Theme} from 'react-native-paper';

export interface ArcanaSwitchStyles {
  viewContainer: ViewStyle;
  inputIOS: TextStyle;
}

export const makeArcanaSwitchStyles = (theme: Theme) =>
  StyleSheet.create<ArcanaSwitchStyles>({
    viewContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingLeft: 15,
      borderRadius: theme.roundness,
    },
    inputIOS: {
      color: theme.colors.text,
    },
  });
