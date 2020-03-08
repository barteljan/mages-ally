import {DiceRoll} from '../../rules/dice-roll/DiceRoll';
import {DiceRollConfig} from '../../rules/dice-roll/DiceRoll.config';
import {Theme} from 'react-native-paper';

export type RollsProps = {
  theme: Theme;
  rolls: DiceRoll[];
  addRoll: () => void;
  onReroll: (item: DiceRollConfig) => void;
  itemSelected: (item: DiceRoll) => void;
  delete: (id: string) => void;
};
