import {ViewStyle} from 'react-native';
export type MageTextInputProps = {
  identifier: string;
  label: string;
  parent: string;
  value: string | undefined;
  style?: ViewStyle;
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
