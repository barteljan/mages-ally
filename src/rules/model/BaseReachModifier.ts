import {BaseGameValue} from './BaseGameValue';
import {GameValueType} from '../../GameValueTypes';

export type BaseReachModifier = BaseGameValue & {
  reachModifier: number;
};

export function makeReachModifier(
  id: string,
  modifier?: Partial<BaseReachModifier>,
): BaseReachModifier {
  return {
    id: id,
    type: GameValueType.other,
    reachModifier: 0,
    description: '',
    ...modifier,
  };
}

export function toReachModifier(item: any): BaseReachModifier | null {
  if (
    item.id !== undefined &&
    item.type !== undefined &&
    item.reachModifier !== undefined
  ) {
    return item as BaseReachModifier;
  }
  return null;
}

export function reachModifier(item: any): number {
  const castedItem = toReachModifier(item);
  return castedItem ? castedItem.reachModifier : 0;
}
