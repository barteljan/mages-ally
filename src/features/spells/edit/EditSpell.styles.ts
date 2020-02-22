import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {FontSize} from '../../../layout/Font';
import {Theme} from 'react-native-paper';

export type EditSpellsStyle = {
  container: ViewStyle;
  containerContent: ViewStyle;
  title: TextStyle;
  inputField: ViewStyle;
  inputContainer: ViewStyle;
};

export const makeEditSpellStyles = (theme: Theme) =>
  StyleSheet.create<EditSpellsStyle>({
    container: {
      flex: 1,
      paddingVertical: 15,
      paddingHorizontal: 15,
      backgroundColor: theme.colors.background,
    },
    containerContent: {
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    title: {
      fontSize: FontSize.header,
      fontFamily: theme.fonts.regular.fontFamily,
      fontWeight: theme.fonts.regular.fontWeight,
      color: theme.colors.disabled,
      marginBottom: 15,
    },
    inputField: {
      height: 52,
      width: '100%',
      marginBottom: 20,
    },
    inputContainer: {
      marginBottom: 20,
    },
  });
