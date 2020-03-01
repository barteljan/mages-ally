import {ViewStyle, TextStyle} from 'react-native';
import {Theme} from 'react-native-paper';
import {Yantra} from '../../../../../rules/spells/yantra/yantra';

export type YantraRowStyle = {
  yantraContainer: ViewStyle;
  deleteButton: ViewStyle;
  titleStyle: TextStyle;
};

export const makeYantraRowStyle = (
  theme: Theme,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  yantra: Yantra,
): YantraRowStyle => {
  return {
    yantraContainer: {
      width: '100%',
      height: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingRight: 8,
    },
    deleteButton: {
      padding: 7,
    },
    titleStyle: {
      paddingLeft: 15,
      color: theme.colors.text,
    },
  };
};
