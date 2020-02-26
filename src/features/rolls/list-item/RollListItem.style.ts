import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {FontSize} from '../../../layout/Font';
import {Theme} from 'react-native-paper';

export type RollsItemStyle = {
  container: ViewStyle;
  infoRow: ViewStyle;
  titleContainer: ViewStyle;
  title: TextStyle;
  subtitleWrapper: ViewStyle;
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
    titleContainer: {
      flexDirection: 'row',
      flexWrap: 'nowrap',
    },
    title: {fontSize: 18, maxWidth: '68%'},
    subtitleWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    subtitle: {
      marginTop: 5,
      marginRight: 5,
      fontSize: FontSize.small,
    },
    rightSubtitle: {
      marginTop: 5,
      fontSize: FontSize.small,
      fontWeight: 'bold',
    },
    success: {
      color: theme.colors.primary,
    },
    failure: {
      color: theme.colors.error,
    },
  });
