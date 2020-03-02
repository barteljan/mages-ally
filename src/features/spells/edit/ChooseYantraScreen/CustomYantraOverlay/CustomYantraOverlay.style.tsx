import {ViewStyle, TextStyle, StyleSheet} from 'react-native';
import {Theme} from 'react-native-paper';
import {FontSize} from '../../../../../layout/Font';

export type CustomYantraOverlayStyle = {
  container: ViewStyle;
  viewTitle: TextStyle;
  valueContainer: ViewStyle;
  buttonContainer: ViewStyle;
  button: ViewStyle;
  addButtonText: TextStyle;
  cancleButtonText: TextStyle;
};

export const makeCustomYantraOverlayStyle = (
  theme: Theme,
): CustomYantraOverlayStyle => {
  return StyleSheet.create<CustomYantraOverlayStyle>({
    container: {padding: 15},
    viewTitle: {
      textAlign: 'center',
      fontSize: FontSize.header,
      fontFamily: theme.fonts.medium.fontFamily,
      fontWeight: theme.fonts.medium.fontWeight,
      color: theme.colors.primary,
      marginBottom: 20,
    },
    valueContainer: {marginBottom: 20},
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    button: {
      flex: 0.48,
    },
    addButtonText: {
      color: theme.colors.primary,
    },
    cancleButtonText: {
      color: theme.colors.disabled,
    },
  });
};
