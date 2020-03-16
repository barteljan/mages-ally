import {ViewStyle, TextStyle, StyleProp} from 'react-native';
import {Theme} from 'react-native-paper';

export type InputContainerProps = {
  title: string;
  children: Element;
  theme: Theme;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  height?: number | 'auto';
};
