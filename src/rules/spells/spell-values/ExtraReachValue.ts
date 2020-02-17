import {
  BaseReachModifier,
  makeReachModifier,
} from '../../model/BaseReachModifier';
import {SpellValueIds} from './SpellValueIds';
import {GameValueType} from '../../../GameValueTypes';

export type ExtraReachValue = BaseReachModifier & {
  id: SpellValueIds.extraReach;
  type: GameValueType.spellValue;
};

export function makeExtraReachValue(
  value?: Partial<ExtraReachValue>,
): ExtraReachValue {
  return (makeReachModifier(SpellValueIds.extraReach, {
    type: GameValueType.spellValue,
    ...value,
  }) as unknown) as ExtraReachValue;
}
