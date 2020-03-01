import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {Theme} from 'react-native-paper';

export type AddButtonStyle = {
  iosIcon: ViewStyle;
  actionButtonIconContainer: TextStyle;
  FAB: ViewStyle;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const makeAddButtonStyle = (theme: Theme) =>
  StyleSheet.create<AddButtonStyle>({
    iosIcon: {
      padding: 15,
    },
    actionButtonIconContainer: {
      paddingLeft: 5,
      paddingTop: 4,
    },
    FAB: {
      position: 'absolute',
      right: 25,
      bottom: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
