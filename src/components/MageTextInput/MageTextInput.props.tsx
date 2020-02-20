import {ViewStyle} from 'react-native';
export type MageTextInputProps = {
  identifier: string;
  label: string;
  value: string | undefined;
  style?: ViewStyle;
  onBlur: (identifier: string, text: string | undefined) => void;
};
