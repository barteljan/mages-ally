import {
  BaseReachModifier,
  makeReachModifier,
} from '../../model/BaseReachModifier';
import {SpellValueIds} from './SpellValueIds';
import {GameValueType} from '../../../GameValueTypes';

export type ActiveSpellReachModifierValue = BaseReachModifier & {
  id: SpellValueIds.activeSpells;
  type: GameValueType.spellValue;
};

export function makeActiveSpellReachModifierValue(
  value?: Partial<ActiveSpellReachModifierValue>,
): ActiveSpellReachModifierValue {
  return (makeReachModifier(SpellValueIds.activeSpells, {
    type: GameValueType.spellValue,
    ...value,
  }) as unknown) as ActiveSpellReachModifierValue;
}
