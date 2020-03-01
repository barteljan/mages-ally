import {ViewStyle, StyleSheet, TextStyle} from 'react-native';
import {Theme} from 'react-native-paper';

export type ChooseYantraScreenStyle = {
  container: ViewStyle;
  contentContainer: ViewStyle;
  buttonContainer: ViewStyle;
  inputContainer: ViewStyle;
  addButtonText: TextStyle;
};

export const makeChooseYantraScreenStyle = (theme: Theme) =>
  StyleSheet.create<ChooseYantraScreenStyle>({
    container: {
      backgroundColor: theme.colors.background,
    },
    contentContainer: {
      paddingBottom: 15,
    },
    buttonContainer: {
      marginTop: 20,
      marginBottom: 0,
      marginHorizontal: 15,
    },
    inputContainer: {},
    addButtonText: {
      fontWeight: 'bold',
    },
  });
