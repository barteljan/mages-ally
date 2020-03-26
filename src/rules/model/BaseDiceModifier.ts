import {BaseGameValue} from './BaseGameValue';
import {GameValueType} from '../../GameValueTypes';

export type BaseDiceModifier<
  IdType extends string = string,
  ValueType extends number = number
> = BaseGameValue & {
  id: IdType;
  diceModifier: ValueType;
};

export function makeDiceModifier<IdType extends string = string>(
  id: IdType,
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

export function toDiceModifier(item: any): BaseDiceModifier | null {
  if (
    item.id !== undefined &&
    item.type !== undefined &&
    item.diceModifier !== undefined
  ) {
    return item as BaseDiceModifier;
  }
  return null;
}

export function diceModifier(item: any): number {
  const castedItem = toDiceModifier(item);
  return castedItem ? castedItem.diceModifier : 0;
}
