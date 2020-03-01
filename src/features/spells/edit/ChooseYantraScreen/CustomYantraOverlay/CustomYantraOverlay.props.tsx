import {LayoutRectangle} from 'react-native';
import {Theme} from 'react-native-paper';
export type CustomYantraOverlayProps = {
  theme: Theme;
  parent: string;
  isVisible: boolean;
  height: number;
  onLayout: (rect: LayoutRectangle) => void;
  add: (title: string, value: number) => void;
  cancle: () => void;
};
