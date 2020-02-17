import {
  BaseParadoxModifier,
  makeParadoxModifier,
} from '../../model/BaseParadoxModifier';
import {SpellValueIds} from './SpellValueIds';
import {GameValueType} from '../../../GameValueTypes';

export type SleeperWitnessesValue = BaseParadoxModifier & {
  id: SpellValueIds.sleeperWitnesses;
  type: GameValueType.spellValue;
};

export function makeSleeperWitnessesValue(
  value?: Partial<SleeperWitnessesValue>,
): SleeperWitnessesValue {
  return (makeParadoxModifier(SpellValueIds.sleeperWitnesses, {
    type: GameValueType.spellValue,
    ...value,
  }) as unknown) as SleeperWitnessesValue;
}
