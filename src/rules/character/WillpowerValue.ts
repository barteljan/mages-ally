import {DiceModifier} from '../../data-types/DiceModifier';
import {GameValueType} from '../../GameValueTypes';

export type WillpowerValue = DiceModifier & {
  id: 'willpower';
  type: GameValueType.characterValue;
};

export function makeWillpowerValue(
  willpower: Partial<WillpowerValue>,
): WillpowerValue {
  return {
    id: 'willpower',
    type: GameValueType.characterValue,
    diceModifier: 0,
    ...willpower,
  };
}
