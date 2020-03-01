import {ViewStyle, StyleSheet} from 'react-native';
import {Theme} from 'react-native-paper';

export type InputContainerStyle = {
  container: ViewStyle;
  label: ViewStyle;
};

export const makeInputContainerStyle = (
  theme: Theme,
  height?: number | 'auto',
) => {
  let containerHeight: {height?: number} = {height: 52};

  if (height && height === 'auto') {
    containerHeight = {};
  } else if (height) {
    containerHeight = {height};
  }

  return StyleSheet.create<InputContainerStyle>({
    container: {
      width: '100%',
      justifyContent: 'center',
      borderStyle: 'solid',
      borderColor: theme.colors.disabled,
      borderWidth: 1,
      borderRadius: theme.roundness,
      backgroundColor: theme.colors.surface,
      elevation: 3,
      ...containerHeight,
    },
    label: {
      color: theme.colors.disabled,
      fontFamily: theme.fonts.light.fontFamily,
      position: 'absolute',
      left: 10,
      top: -8,
      fontSize: 10,
      paddingHorizontal: 3,
      paddingVertical: 0,
      backgroundColor: theme.colors.surface,
    },
  });
};
