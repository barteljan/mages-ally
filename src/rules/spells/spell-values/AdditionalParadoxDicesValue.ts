import {
  BaseParadoxModifier,
  makeParadoxModifier,
} from '../../model/BaseParadoxModifier';
import {SpellValueIds} from './SpellValueIds';
import {GameValueType} from '../../../GameValueTypes';

export type AdditionalParadoxDicesValue = BaseParadoxModifier & {
  id: SpellValueIds.additionalParadoxDices;
  type: GameValueType.spellValue;
};

export function makeAdditionalParadoxDicesValue(
  value?: Partial<AdditionalParadoxDicesValue>,
): AdditionalParadoxDicesValue {
  return (makeParadoxModifier(SpellValueIds.additionalParadoxDices, {
    type: GameValueType.spellValue,
    ...value,
  }) as unknown) as AdditionalParadoxDicesValue;
}
