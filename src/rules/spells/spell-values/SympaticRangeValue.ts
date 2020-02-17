import {BaseManaModifier, makeManaModifier} from '../../model/BaseManaModifier';
import {SpellValueIds} from './SpellValueIds';
import {GameValueType} from '../../../GameValueTypes';

export type SymphaticRangeValue = BaseManaModifier & {
  id: SpellValueIds.symphaticRange;
  type: GameValueType.spellValue;
};

export function makeSymphaticRangeValue(
  value?: Partial<SymphaticRangeValue>,
): SymphaticRangeValue {
  return (makeManaModifier(SpellValueIds.symphaticRange, {
    type: GameValueType.spellValue,
    ...value,
  }) as unknown) as SymphaticRangeValue;
}
