import {SpellFactorLevel} from './SpellFactor.level';
import {SpellFactorType} from './SpellFactor.type';
import {GameValueType} from '../../../GameValueTypes';
import {BaseGameValue} from '../../model/BaseGameValue';
import {BaseReachModifier} from '../../model/BaseReachModifier';
import {BaseManaModifier} from '../../../rules/model/BaseManaModifier';

export type SpellFactor = BaseGameValue &
  BaseReachModifier &
  BaseManaModifier & {
    spellFactorType: SpellFactorType;
    level: SpellFactorLevel;
    maxStandardValue: number;
    maxAdvancedValue: number;
    value: number;
  };

export function makeSpellFactor(
  type: SpellFactorType,
  factor?: Partial<SpellFactor>,
): SpellFactor {
  let maxStandardValue = 1;
  let maxAdvancedValue = 1;

  switch (type) {
    case SpellFactorType.castingTime:
      maxStandardValue = 6;
      maxAdvancedValue = 1;
      break;
    case SpellFactorType.duration:
      maxStandardValue = 5;
      maxAdvancedValue = 6;
      break;
    case SpellFactorType.potency:
      maxStandardValue = 11;
      maxAdvancedValue = 11;
      break;
    case SpellFactorType.range:
      maxStandardValue = 1;
      maxAdvancedValue = 1;
      break;
    case SpellFactorType.scale:
      maxStandardValue = 5;
      maxAdvancedValue = 9;
      break;
  }

  return {
    id: type,
    level: SpellFactorLevel.standard,
    spellFactorType: type,
    type: GameValueType.spellFactor,
    value: 1,
    manaModifier: 0,
    reachModifier: factor && factor.level === SpellFactorLevel.advanced ? 1 : 0,
    maxStandardValue,
    maxAdvancedValue,
    ...factor,
  };
}
