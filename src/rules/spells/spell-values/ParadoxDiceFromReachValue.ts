import {
  BaseParadoxModifier,
  makeParadoxModifier,
} from '../../model/BaseParadoxModifier';
import {SpellValueIds} from './SpellValueIds';
import {GameValueType} from '../../../GameValueTypes';

export type ParadoxDiceFromReachValue = BaseParadoxModifier & {
  id: SpellValueIds.paradoxDiceFromReach;
  type: GameValueType.spellValue;
};

export function makeParadoxDiceFromReachValue(
  value?: Partial<ParadoxDiceFromReachValue>,
): ParadoxDiceFromReachValue {
  return (makeParadoxModifier(SpellValueIds.paradoxDiceFromReach, {
    type: GameValueType.spellValue,
    ...value,
  }) as unknown) as ParadoxDiceFromReachValue;
}
