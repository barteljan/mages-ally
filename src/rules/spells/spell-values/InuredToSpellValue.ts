import {
  BaseParadoxModifier,
  makeParadoxModifier,
} from '../../model/BaseParadoxModifier';
import {SpellValueIds} from './SpellValueIds';
import {GameValueType} from '../../../GameValueTypes';

export type InuredToSpellValue = BaseParadoxModifier & {
  id: SpellValueIds.inuredToSpell;
  type: GameValueType.spellValue;
};

export function makeInuredToSpellValue(
  value?: Partial<InuredToSpellValue>,
): InuredToSpellValue {
  return (makeParadoxModifier(SpellValueIds.inuredToSpell, {
    type: GameValueType.spellValue,
    ...value,
  }) as unknown) as InuredToSpellValue;
}
