import {ViewStyle} from 'react-native';

export interface DiceSelectProps {
  numberOfDice: number;
  value: number;
  selectedColor: string;
  unselectedColor: string;
  style?: ViewStyle;
  groupStyle?: ViewStyle;
  onSelect: (index: number) => void;
}
