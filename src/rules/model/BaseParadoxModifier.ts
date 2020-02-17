import {BaseGameValue} from './BaseGameValue';
import {GameValueType} from '../../GameValueTypes';
import {DiceRollAgainType} from '../dice-roll/DiceRollAgainType';

export type BaseParadoxModifier = BaseGameValue & {
  paradoxModifier: number;
  rollAgainType: DiceRollAgainType;
};

export function makeParadoxModifier(
  id: string,
  modifier?: Partial<BaseParadoxModifier>,
): BaseParadoxModifier {
  return {
    id: id,
    type: GameValueType.other,
    paradoxModifier: 0,
    rollAgainType: DiceRollAgainType.tenAgain,
    description: '',
    ...modifier,
  };
}

export function toParadoxModifier(item: any): BaseParadoxModifier | null {
  if (
    item.id !== undefined &&
    item.type !== undefined &&
    item.paradoxModifier !== undefined &&
    item.rollAgainType !== undefined
  ) {
    return item as BaseParadoxModifier;
  }
  return null;
}

export function paradoxModifier(item: any): number {
  const castedItem = toParadoxModifier(item);
  return castedItem ? castedItem.paradoxModifier : 0;
}
