import {ViewStyle} from 'react-native';

export type DiceSelectProps = {
  numberOfDice: number;
  value: number;
  selectedColor: string;
  selectedTextColor: string;
  unselectedColor: string;
  unselectedTextColor: string;
  scale?: number;
  style?: ViewStyle;
  groupStyle?: ViewStyle;
  onSelect: (index: number) => void;
};
