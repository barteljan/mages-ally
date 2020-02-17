import {
  BaseParadoxModifier,
  makeParadoxModifier,
} from '../../model/BaseParadoxModifier';
import {SpellValueIds} from './SpellValueIds';
import {GameValueType} from '../../../GameValueTypes';
import {BaseManaModifier} from '../../model/BaseManaModifier';

export type AdditionalManaSpendForReducingParadoxValue = BaseParadoxModifier &
  BaseManaModifier & {
    id: SpellValueIds.additionalManaSpendForReducingParadox;
    type: GameValueType.spellValue;
  };

export function makeAdditionalManaSpendForReducingParadoxValue(
  value?: Partial<AdditionalManaSpendForReducingParadoxValue>,
): AdditionalManaSpendForReducingParadoxValue {
  return (makeParadoxModifier(
    SpellValueIds.additionalManaSpendForReducingParadox,
    {
      type: GameValueType.spellValue,
      ...value,
    },
  ) as unknown) as AdditionalManaSpendForReducingParadoxValue;
}
