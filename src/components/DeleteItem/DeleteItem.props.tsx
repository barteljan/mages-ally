import {Theme} from 'react-native-paper';
import {ViewStyle} from 'react-native';

export type DeleteItemProps = {
  theme: Theme;
  delete: (id: string) => void;
  id: string;
  containerStyle?: ViewStyle;
};
