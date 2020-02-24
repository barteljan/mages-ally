import {ViewStyle} from 'react-native';

export type DiceSelectProps = {
  numberOfDice: number;
  value: number;
  selectedColor: string;
  selectedTextColor: string;
  unselectedColor: string;
  unselectedTextColor: string;
  style?: ViewStyle;
  groupStyle?: ViewStyle;
  onSelect: (index: number) => void;
};
