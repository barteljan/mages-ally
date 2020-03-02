import {Theme} from 'react-native-paper';
import {DiceRoll} from '../../../rules/dice-roll/DiceRoll';
import {DiceRollConfig} from '../../../rules/dice-roll/DiceRoll.config';
import {ViewStyle, TextStyle} from 'react-native';
export type RollItemProps = {
  theme: Theme;
  item: DiceRoll;
  onAction: (item: DiceRollConfig) => void;
  iconName?: string;
  wrapperStyle?: ViewStyle;
  titleStyle?: TextStyle;
  scaleDice?: number;
  onPress?: (item: DiceRoll) => void;
};
