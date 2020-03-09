import {BaseManaModifier, makeManaModifier} from '../../model/BaseManaModifier';
import {SpellValueIds} from './SpellValueIds';
import {GameValueType} from '../../../GameValueTypes';

export type ManaCostValue = BaseManaModifier & {
  id: SpellValueIds.manaCost;
  type: GameValueType.spellValue;
};

export function makeManaCostValue(
  value?: Partial<ManaCostValue>,
): ManaCostValue {
  return (makeManaModifier(SpellValueIds.manaCost, {
    type: GameValueType.spellValue,
    ...value,
  }) as unknown) as ManaCostValue;
}
