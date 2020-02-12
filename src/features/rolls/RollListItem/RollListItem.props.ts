import {DiceRoll} from '../../../rules/dice-roll/DiceRoll';
import {DiceRollConfig} from '../../../rules/dice-roll/DiceRoll.config';
export interface RollListItemProps {
  item: DiceRoll;
  onReroll: (item: DiceRollConfig) => void;
}
