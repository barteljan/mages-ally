import {ViewStyle, TextStyle, StyleSheet} from 'react-native';
import {Theme} from 'react-native-paper';

export type MageSwitchStyle = {
  container: ViewStyle;
  label: TextStyle;
  switch: ViewStyle;
};

export const makeMageSwitchStyle = (theme: Theme) =>
  StyleSheet.create<MageSwitchStyle>({
    container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      minHeight: 52,
      paddingHorizontal: 10,
      borderColor: theme.colors.disabled,
      borderWidth: 1,
      borderRadius: 2,
    },
    label: {color: theme.colors.onBackground, fontSize: 14, maxWidth: '80%'},
    switch: {},
  });
