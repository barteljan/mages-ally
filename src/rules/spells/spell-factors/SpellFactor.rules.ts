import {BaseDiceModifier} from '../../../data-types/BaseDiceModifier';
import {GameValueType} from '../../../GameValueTypes';
import {SpellFactorLevel} from './SpellFactor.level';
import {SpellFactorType} from './SpellFactor.type';

export type SpellFactorRules<Type extends SpellFactorType> = {
  standard: SpellFactorRuleLevel<Type>[];
  advanced: SpellFactorRuleLevel<Type>[];
};

export type SpellFactorRuleLevel<
  Type extends SpellFactorType
> = BaseDiceModifier & {
  type: GameValueType.spellFactorRuleLevel;
  spellFactorType: SpellFactorType;
  level: SpellFactorLevel;
  index: number;
};

export function makeSpellFactorRuleLevel<Type extends SpellFactorType>(
  ruleIdentifier: string,
  level: SpellFactorLevel,
  diceModifier: number,
  type: SpellFactorType,
  index: number,
  ruleLevel?: Partial<SpellFactorRuleLevel<Type>>,
): SpellFactorRuleLevel<Type> {
  return {
    id: type,
    type: GameValueType.spellFactorRuleLevel,
    level: level,
    diceModifier: diceModifier,
    spellFactorType: type,
    index,
    ...ruleLevel,
  };
}
