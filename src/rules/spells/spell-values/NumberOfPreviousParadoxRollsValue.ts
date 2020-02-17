import {
  BaseParadoxModifier,
  makeParadoxModifier,
} from '../../model/BaseParadoxModifier';
import {SpellValueIds} from './SpellValueIds';
import {GameValueType} from '../../../GameValueTypes';

export type NumberOfPreviousParadoxRollsValue = BaseParadoxModifier & {
  id: SpellValueIds.numberOfPreviousParadoxRolls;
  type: GameValueType.spellValue;
};

export function makeNumberOfPreviousParadoxRollsValue(
  value?: Partial<NumberOfPreviousParadoxRollsValue>,
): NumberOfPreviousParadoxRollsValue {
  return (makeParadoxModifier(SpellValueIds.numberOfPreviousParadoxRolls, {
    type: GameValueType.spellValue,
    ...value,
  }) as unknown) as NumberOfPreviousParadoxRollsValue;
}
