import {ViewStyle} from 'react-native';
import {Theme} from 'react-native-paper';
export type MageTextInputProps = {
  identifier: string;
  label: string;
  parent: string;
  value: string | undefined;
  style?: ViewStyle;
  theme: Theme;
  onChangeText?: (
    identifier: string,
    text: string | undefined,
    parent: string,
  ) => void;
  onBlur: (
    identifier: string,
    text: string | undefined,
    parent: string,
  ) => void;
};
