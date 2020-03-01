import {ViewStyle, ImageStyle, StyleSheet} from 'react-native';
import {Theme} from 'react-native-paper';

export type MultipleDiceViewStyles = {
  container: ViewStyle;
  successDice: ImageStyle;
  failureDice: ImageStyle;
};

export const makeMultipleDiceViewStyles = (theme: Theme) =>
  StyleSheet.create<MultipleDiceViewStyles>({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    successDice: {
      tintColor: theme.colors.primary,
    },
    failureDice: {
      tintColor: theme.colors.disabled,
    },
  });
