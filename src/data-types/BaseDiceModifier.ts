import {BaseGameValue} from './BaseGameValue';
import {GameValueType} from '../GameValueTypes';

export type BaseDiceModifier = BaseGameValue & {
  diceModifier: number;
};

export function makeDiceModifier(
  id: string,
  modifier?: Partial<BaseDiceModifier>,
): BaseDiceModifier {
  return {
    id: id,
    type: GameValueType.other,
    diceModifier: 0,
    description: '',
    ...modifier,
  };
}
