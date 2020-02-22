import {StyleSheet, ViewStyle, ImageStyle, TextStyle} from 'react-native';
import {Theme} from 'react-native-paper';

export type AddButtonStyle = {
  iosIcon: ViewStyle;
  actionButtonIcon: ImageStyle;
  actionButtonIconContainer: TextStyle;
  FAB: ViewStyle;
};

export const makeAddButtonStyle = (theme: Theme) =>
  StyleSheet.create<AddButtonStyle>({
    iosIcon: {
      padding: 15,
    },
    actionButtonIconContainer: {
      paddingLeft: 5,
      paddingTop: 4,
    },
    actionButtonIcon: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
      tintColor: theme.colors.background,
    },
    FAB: {
      position: 'absolute',
      right: 25,
      bottom: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
