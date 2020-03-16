import {Theme} from 'react-native-paper';
import {ViewStyle, StyleProp} from 'react-native';

export type MageSwitchProps = {
  theme: Theme;
  identifier: string;
  parent: string;
  label: string;
  value: boolean;
  onValueChanged: (identifier: string, value: boolean, parent: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
};
