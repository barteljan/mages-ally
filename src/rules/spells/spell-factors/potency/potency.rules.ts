import {SpellFactorRules, SpellFactorRuleLevel} from '../SpellFactor.rules';
import {SpellFactorLevel} from '../SpellFactor.level';
import {spellFactorLabelPotency} from './potency.strings';

export type PotencyRules = SpellFactorRules;

export function makePotencyRules(
  numberOfLevels: number = 11,
  spellFactorLabel: (
    level: SpellFactorLevel,
    value: number,
  ) => string = spellFactorLabelPotency,
): PotencyRules {
  const rules: SpellFactorRules = {
    standard: [],
    advanced: [],
  };

  for (let i = 0; i < numberOfLevels; i++) {
    const itemStandard: SpellFactorRuleLevel = {
      description: spellFactorLabel(SpellFactorLevel.standard, i),
      diceModifier: i * -2,
    };
    const itemAdvanced: SpellFactorRuleLevel = {
      description: spellFactorLabel(SpellFactorLevel.standard, i),
      diceModifier: i * -2,
    };
    rules.standard.push(itemStandard);
    rules.advanced.push(itemAdvanced);
  }

  return rules;
}
