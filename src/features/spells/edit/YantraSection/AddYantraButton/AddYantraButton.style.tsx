import {ViewStyle, TextStyle} from 'react-native';
import {Theme} from 'react-native-paper';

export type AddYantraButtonStyle = {
  containerStyle: ViewStyle;
  containerTitle: TextStyle;
  buttonStyle: ViewStyle;
  buttonText: TextStyle;
};

export const makeAddYantraButtonStyle = (
  theme: Theme,
  containerStyle: ViewStyle,
): AddYantraButtonStyle => {
  return {
    containerStyle: {
      ...containerStyle,
      borderColor: theme.colors.primary,
    },
    containerTitle: {
      color: theme.colors.primary,
    },
    buttonStyle: {
      paddingHorizontal: 15,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    buttonText: {
      color: theme.colors.primary,
    },
  };
};
