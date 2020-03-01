import {ViewStyle, TextStyle} from 'react-native';
import {Theme} from 'react-native-paper';

export type FormButtonProps = {
  theme: Theme;
  parent: string;
  title: string;
  onPress: (parent: string) => void;
  containerStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
};
