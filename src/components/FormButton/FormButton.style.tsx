import {ViewStyle, TextStyle} from 'react-native';
import {Theme} from 'react-native-paper';

export type FormButtonStyle = {
  containerStyle: ViewStyle;
  containerTitle: TextStyle;
  buttonStyle: ViewStyle;
  buttonText: TextStyle;
  iconContainer: ViewStyle;
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
      backgroundColor: theme.colors.surface,
      opacity: 0.9,
      borderRadius: 15,
      elevation: 10,
      borderWidth: 2,
      ...containerStyle,
    },
    containerTitle: {
      color: 'transparent',
      backgroundColor: 'transparent',
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
      fontWeight: 'bold',
      ...buttonTextStyle,
    },
    iconContainer: {},
  };
};
