import {ViewStyle, StyleSheet} from 'react-native';
import {Theme} from 'react-native-paper';

export type FormSectionStyles = {
  container: ViewStyle;
};

export function makeFormSectionStyles(
  theme: Theme,
  collapsed: boolean,
): FormSectionStyles {
  return StyleSheet.create<FormSectionStyles>({
    container: {
      borderColor: theme.colors.disabled,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderLeftWidth: collapsed ? 1 : 0,
      borderRightWidth: collapsed ? 1 : 0,
      marginBottom: 20,
    },
  });
}
