import {ViewStyle} from 'react-native';
export type DotProps = {
  seleced: boolean;
  value: number;
  onPress?: (value: number) => void;
  containerStyle?: ViewStyle;
  size: number;
};
