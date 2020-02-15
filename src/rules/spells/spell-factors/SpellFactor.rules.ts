import {DiceModifier} from '../../../data-types/DiceModifier';
import {GameValueType} from '../../../GameValueTypes';
import {SpellFactorLevel} from './SpellFactor.level';

export type SpellFactorRuleLevel = DiceModifier & {
  type: GameValueType.spellFactorRuleLevel;
  level: SpellFactorLevel;
};

export function makeSpellFactorRuleLevel(
  ruleIdentifier: string,
  level: SpellFactorLevel,
  value: number,
  modifier?: Partial<SpellFactorRuleLevel>,
): SpellFactorRuleLevel {
  return {
    id: ruleIdentifier + '_' + level + '_' + value,
    type: GameValueType.spellFactorRuleLevel,
    level: level,
    value: value,
    ...modifier,
  };
}

export type SpellFactorRules = {
  standard: SpellFactorRuleLevel[];
  advanced: SpellFactorRuleLevel[];
};
