import {ViewStyle} from 'react-native';
import {Theme} from 'react-native-paper';

export type AddYantraButtonProps = {
  theme: Theme;
  containerStyle: ViewStyle;
  parent: string;
  addYantra: (parent: string) => void;
};
