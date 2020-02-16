import {SpellFactorLevel} from './SpellFactor.level';
import {SpellFactorType} from './SpellFactor.type';
import {GameValueType} from '../../../GameValueTypes';
import {BaseGameValue} from '../../../data-types/BaseGameValue';

export type SpellFactor = BaseGameValue & {
  spellFactorType: SpellFactorType;
  level: SpellFactorLevel;
  value: number;
};

export function makeSpellFactor(
  type: SpellFactorType,
  factor?: Partial<SpellFactor>,
): SpellFactor {
  return {
    id: type,
    level: SpellFactorLevel.standard,
    spellFactorType: SpellFactorType.castingTime,
    type: GameValueType.spellFactor,
    value: 0,
    ...factor,
  };
}
