import {SpellValueIds} from './SpellValueIds';
import {GameValueType} from '../../../GameValueTypes';
import {
  BaseReachModifier,
  makeReachModifier,
} from '../../model/BaseReachModifier';

export type ChangePrimarySpellFactorValue = BaseReachModifier & {
  id: SpellValueIds.changePrimarySpellFactor;
  type: GameValueType.spellValue;
};

export function makeChangePrimarySpellFactorValue(
  value?: Partial<ChangePrimarySpellFactorValue>,
): ChangePrimarySpellFactorValue {
  return (makeReachModifier(SpellValueIds.changePrimarySpellFactor, {
    type: GameValueType.spellValue,
    ...value,
  }) as unknown) as ChangePrimarySpellFactorValue;
}
