import {DiceRoll} from '../../rules/dice-roll/DiceRoll';
import {DiceRollConfig} from '../../rules/dice-roll/DiceRoll.config';

export interface RollsProps {
  rolls: DiceRoll[];
  addRoll: () => void;
  onReroll: (item: DiceRollConfig) => void;
}
