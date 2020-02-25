import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {FontSize} from '../../../layout/Font';
import {Theme} from 'react-native-paper';

export type EditSpellsStyle = {
  container: ViewStyle;
  containerContent: ViewStyle;
  section: ViewStyle;
  scrollView: ViewStyle;
  accordion: ViewStyle;
  accordionIcon: ViewStyle;
  title: TextStyle;
  inputField: ViewStyle;
  inputContainer: ViewStyle;
  switch: ViewStyle;
};

export const makeEditSpellStyles = (theme: Theme) =>
  StyleSheet.create<EditSpellsStyle>({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      paddingVertical: 15,
      paddingHorizontal: 15,
    },
    containerContent: {
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    section: {width: '100%', marginTop: 0},
    accordion: {},
    accordionIcon: {paddingRight: 10},
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
    switch: {
      marginBottom: 20,
    },
  });
