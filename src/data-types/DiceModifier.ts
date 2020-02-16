import {GameValue} from './GameValue';
import {GameValueType} from '../GameValueTypes';

export type DiceModifier = GameValue & {
  diceModifier: number;
};

export function makeDiceModifier(
  id: string,
  modifier?: Partial<DiceModifier>,
): DiceModifier {
  return {
    id: id,
    type: GameValueType.other,
    diceModifier: 0,
    description: '',
    ...modifier,
  };
}
