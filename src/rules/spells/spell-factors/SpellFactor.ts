import {SpellFactorLevel} from './SpellFactor.level';
import {SpellFactorType} from './SpellFactor.type';
import {GameValueType} from '../../../GameValueTypes';
import {BaseGameValue} from '../../model/BaseGameValue';
import {BaseReachModifier} from '../../model/BaseReachModifier';
import {BaseManaModifier} from 'src/rules/model/BaseManaModifier';

export type SpellFactor = BaseGameValue &
  BaseReachModifier &
  BaseManaModifier & {
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
    value: 1,
    manaModifier: 0,
    reachModifier: factor && factor.level === SpellFactorLevel.advanced ? 1 : 0,
    ...factor,
  };
}
