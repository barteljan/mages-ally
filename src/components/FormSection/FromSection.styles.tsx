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
      borderTopWidth: collapsed ? 1 : 0,
      borderBottomWidth: collapsed ? 1 : 0,
      borderLeftWidth: collapsed ? 1 : 0,
      borderRightWidth: collapsed ? 1 : 0,
      marginBottom: collapsed ? 20 : 0,
      elevation: collapsed ? 3 : 0,
    },
  });
}
