import {ViewStyle, TextStyle} from 'react-native';
import {Theme} from 'react-native-paper';

export type FormButtonStyle = {
  containerStyle: ViewStyle;
  containerTitle: TextStyle;
  buttonStyle: ViewStyle;
  buttonText: TextStyle;
};

export const makeFormButtonStyle = (
  theme: Theme,
  containerStyle?: ViewStyle,
  buttonStyle?: ViewStyle,
  buttonTextStyle?: TextStyle,
): FormButtonStyle => {
  return {
    containerStyle: {
      borderColor: theme.colors.primary,
      ...containerStyle,
    },
    containerTitle: {
      color: theme.colors.primary,
    },
    buttonStyle: {
      paddingHorizontal: 15,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      height: '100%',
      alignItems: 'center',
      ...buttonStyle,
    },
    buttonText: {
      color: theme.colors.primary,
      ...buttonTextStyle,
    },
  };
};
