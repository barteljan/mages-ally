import {BaseGameValue} from './BaseGameValue';
import {GameValueType} from '../../GameValueTypes';

export type BaseManaModifier = BaseGameValue & {
  manaModifier: number;
};

export function makeManaModifier(
  id: string,
  modifier?: Partial<BaseManaModifier>,
): BaseManaModifier {
  return {
    id: id,
    type: GameValueType.other,
    manaModifier: 0,
    description: '',
    ...modifier,
  };
}

export function toManaModifier(item: any): BaseManaModifier | null {
  if (
    item.id !== undefined &&
    item.type !== undefined &&
    item.manaModifier !== undefined
  ) {
    return item as BaseManaModifier;
  }
  return null;
}

export function manaModifier(item: any): number {
  const castedItem = toManaModifier(item);
  return castedItem ? castedItem.manaModifier : 0;
}
