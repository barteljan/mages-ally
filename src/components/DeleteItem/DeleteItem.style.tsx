import {ViewStyle, StyleSheet} from 'react-native';
import {Theme} from 'react-native-paper';

export type DeleteItemStyle = {
  swipeBackground: ViewStyle;
  delete: ViewStyle;
};

export const makeDeleteItemStyle = (theme: Theme): DeleteItemStyle =>
  StyleSheet.create<DeleteItemStyle>({
    swipeBackground: {
      alignItems: 'center',
      backgroundColor: theme.colors.error,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    delete: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 75,
      right: 0,
    },
  });
