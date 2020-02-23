import {BaseDiceModifier} from '../../model/BaseDiceModifier';
import {GameValueType} from '../../../GameValueTypes';
import {SpellFactorLevel} from './SpellFactor.level';
import {SpellFactorType} from './SpellFactor.type';
import {BaseReachModifier} from '../../../rules/model/BaseReachModifier';
import {BaseManaModifier} from '../../../rules/model/BaseManaModifier';

export type SpellFactorRules<Type extends SpellFactorType> = {
  standard: SpellFactorRuleLevel<Type>[];
  advanced: SpellFactorRuleLevel<Type>[];
};

export type SpellFactorRuleLevel<
  Type extends SpellFactorType
> = BaseDiceModifier &
  BaseReachModifier &
  BaseManaModifier & {
    type: GameValueType.spellFactorRuleLevel;
    spellFactorType: SpellFactorType;
    level: SpellFactorLevel;
    index: number;
  };

export function makeSpellFactorRuleLevel<Type extends SpellFactorType>(
  level: SpellFactorLevel,
  diceModifier: number,
  type: SpellFactorType,
  index: number,
  ruleLevel?: Partial<SpellFactorRuleLevel<Type>>,
): SpellFactorRuleLevel<Type> {
  let result: SpellFactorRuleLevel<Type> = {
    id: type,
    type: GameValueType.spellFactorRuleLevel,
    level: level,
    diceModifier: diceModifier,
    spellFactorType: type,
    index,
    reachModifier: 0,
    manaModifier: 0,
    ...ruleLevel,
  };
  if (result.level === SpellFactorLevel.advanced) {
    result.reachModifier = 1;
  }
  return result;
}
