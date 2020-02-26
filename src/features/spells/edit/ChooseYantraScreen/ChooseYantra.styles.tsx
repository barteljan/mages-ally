import {ViewStyle, StyleSheet} from 'react-native';
import {Theme} from 'react-native-paper';

export type ChooseYantraScreenStyle = {
  container: ViewStyle;
  contentContainer: ViewStyle;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const makeChooseYantraScreenStyle = (theme: Theme) =>
  StyleSheet.create<ChooseYantraScreenStyle>({
    container: {
      backgroundColor: theme.colors.background,
    },
    contentContainer: {
      paddingBottom: 15,
    },
  });
