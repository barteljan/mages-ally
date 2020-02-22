import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {FontSize} from '../../../layout/Font';
import {Theme} from 'react-native-paper';

export type RollsItemStyle = {
  container: ViewStyle;
  infoRow: ViewStyle;
  skullItem: ViewStyle;
  subtitle: TextStyle;
  rightSubtitle: TextStyle;
  success: ViewStyle;
  failure: ViewStyle;
};

export const makeRollsItemStyle = (theme: Theme) =>
  StyleSheet.create<RollsItemStyle>({
    container: {
      flex: 1,
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderTopColor: theme.colors.disabled,
      borderTopWidth: 1,
    },
    infoRow: {
      flex: 1,
      flexDirection: 'row',
    },
    skullItem: {
      backgroundColor: theme.colors.error,
      height: 40,
      width: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
    },
    subtitle: {
      marginTop: 5,
      fontSize: FontSize.small,
    },
    rightSubtitle: {
      fontSize: FontSize.small,
      fontWeight: 'bold',
      alignSelf: 'flex-end',
      textAlignVertical: 'top',
      textAlign: 'left',
      flex: 1,
      width: 72,
    },
    success: {
      color: theme.colors.accent,
    },
    failure: {
      color: theme.colors.error,
    },
  });
