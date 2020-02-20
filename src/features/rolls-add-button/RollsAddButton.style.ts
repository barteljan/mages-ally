import {StyleSheet, ViewStyle, ImageStyle, TextStyle} from 'react-native';
import {Colors} from '../../layout/Colors';

type ActionButtonStyle = {
  iosIcon: ViewStyle;
  actionButtonIcon: ImageStyle;
  actionButtonIconText: TextStyle;
};

export const style = StyleSheet.create<ActionButtonStyle>({
  iosIcon: {
    padding: 15,
  },
  actionButtonIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    tintColor: Colors.textOnAccentColor,
  },
  actionButtonIconText: {
    position: 'absolute',
    color: Colors.textOnAccentColor,
    top: 13,
    left: 16,
  },
});
