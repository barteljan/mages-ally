import {Theme} from 'react-native-paper';
import {ViewStyle} from 'react-native';
export type MultipleDiceViewProps = {
  parent: string;
  theme: Theme;
  dices: number[];
  difficulty: number;
  containerStyle?: ViewStyle;
  scaleDice?: number;
  onPress?: () => void;
};
