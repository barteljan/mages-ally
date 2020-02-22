import {DiceRoll} from '../../../rules/dice-roll/DiceRoll';
import {DiceRollConfig} from '../../../rules/dice-roll/DiceRoll.config';
import {Theme} from 'react-native-paper';

export type RollListItemProps = {
  theme: Theme;
  item: DiceRoll;
  onReroll: (item: DiceRollConfig) => void;
};
