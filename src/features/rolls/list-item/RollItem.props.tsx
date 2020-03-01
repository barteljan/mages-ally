import {Theme} from 'react-native-paper';
import {DiceRoll} from '../../../rules/dice-roll/DiceRoll';
import {DiceRollConfig} from '../../../rules/dice-roll/DiceRoll.config';
export type RollItemProps = {
  theme: Theme;
  item: DiceRoll;
  onReroll: (item: DiceRollConfig) => void;
};
