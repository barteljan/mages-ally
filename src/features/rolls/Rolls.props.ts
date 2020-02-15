import {DiceRoll} from '../../rules/dice-roll/DiceRoll';
import {DiceRollConfig} from '../../rules/dice-roll/DiceRoll.config';

export type RollsProps = {
  rolls: DiceRoll[];
  addRoll: () => void;
  onReroll: (item: DiceRollConfig) => void;
};
