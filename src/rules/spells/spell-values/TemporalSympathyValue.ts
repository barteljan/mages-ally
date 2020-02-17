import {BaseManaModifier, makeManaModifier} from '../../model/BaseManaModifier';
import {SpellValueIds} from './SpellValueIds';
import {GameValueType} from '../../../GameValueTypes';

export type TemporalSympathyValue = BaseManaModifier & {
  id: SpellValueIds.symphaticRange;
  type: GameValueType.spellValue;
};

export function makeTemporalSympathyValue(
  value?: Partial<TemporalSympathyValue>,
): TemporalSympathyValue {
  return (makeManaModifier(SpellValueIds.temporalSympathy, {
    type: GameValueType.spellValue,
    ...value,
  }) as unknown) as TemporalSympathyValue;
}
