import {ViewStyle} from 'react-native';
import {Theme} from 'react-native-paper';

export type InputContainerProps = {
  title: string;
  children: Element;
  theme: Theme;
  containerStyle?: ViewStyle;
};