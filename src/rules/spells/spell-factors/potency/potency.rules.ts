import {
  SpellFactorRules,
  SpellFactorRuleLevel,
  makeSpellFactorRuleLevel,
} from '../SpellFactor.rules';
import {SpellFactorLevel} from '../SpellFactor.level';
import {spellFactorLabelPotency} from './potency.strings';
import {RulesType} from '../RulesType';

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
    const itemStandard: SpellFactorRuleLevel = makeSpellFactorRuleLevel(
      RulesType.potency,
      SpellFactorLevel.standard,
      i * -2,
      {description: spellFactorLabel(SpellFactorLevel.standard, i)},
    );

    const itemAdvanced: SpellFactorRuleLevel = makeSpellFactorRuleLevel(
      RulesType.potency,
      SpellFactorLevel.advanced,
      i * -2,
      {description: spellFactorLabel(SpellFactorLevel.advanced, i)},
    );
    rules.standard.push(itemStandard);
    rules.advanced.push(itemAdvanced);
  }

  return rules;
}
