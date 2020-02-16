import {
  SpellFactorRules,
  SpellFactorRuleLevel,
  makeSpellFactorRuleLevel,
} from '../SpellFactor.rules';
import {SpellFactorLevel} from '../SpellFactor.level';
import {RulesType} from '../RulesType';
import {SpellFactorType} from '../SpellFactor.type';

export type PotencyRules = SpellFactorRules<SpellFactorType.potency>;
export type PotencyRuleLevel = SpellFactorRuleLevel<SpellFactorType.potency>;

export function makePotencyRules(numberOfLevels: number = 11): PotencyRules {
  const rules: PotencyRules = {
    standard: [],
    advanced: [],
  };

  for (let i = 0; i < numberOfLevels; i++) {
    const itemStandard: PotencyRuleLevel = makeSpellFactorRuleLevel(
      RulesType.potency,
      SpellFactorLevel.standard,
      i * -2,
      SpellFactorType.potency,
      i,
    );

    const itemAdvanced: PotencyRuleLevel = makeSpellFactorRuleLevel(
      RulesType.potency,
      SpellFactorLevel.advanced,
      i * -2,
      SpellFactorType.potency,
      i,
    );
    rules.standard.push(itemStandard);
    rules.advanced.push(itemAdvanced);
  }

  return rules;
}
