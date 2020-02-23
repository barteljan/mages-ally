import {
  SpellFactorRules,
  SpellFactorRuleLevel,
  makeSpellFactorRuleLevel,
} from '../SpellFactor.rules';
import {SpellFactorLevel} from '../SpellFactor.level';
import {SpellFactorType} from '../SpellFactor.type';

export type PotencyRules = SpellFactorRules<SpellFactorType.potency>;
export type PotencyRuleLevel = SpellFactorRuleLevel<SpellFactorType.potency>;

export function makePotencyRules(
  numberOfLevels: number = 11,
  primaryFactor: SpellFactorType,
  magesHighestArcanaValue: number,
): PotencyRules {
  const rules: PotencyRules = {
    standard: [],
    advanced: [],
  };

  for (let i = 0; i < numberOfLevels; i++) {
    let adjustedModifier =
      primaryFactor === SpellFactorType.potency
        ? i * -2 + (magesHighestArcanaValue - 1) * 2
        : i * -2;

    if (adjustedModifier > 0) {
      adjustedModifier = 0;
    }

    const itemStandard: PotencyRuleLevel = makeSpellFactorRuleLevel(
      SpellFactorLevel.standard,
      adjustedModifier,
      SpellFactorType.potency,
      i,
    );

    const itemAdvanced: PotencyRuleLevel = makeSpellFactorRuleLevel(
      SpellFactorLevel.advanced,
      adjustedModifier,
      SpellFactorType.potency,
      i,
    );
    rules.standard.push(itemStandard);
    rules.advanced.push(itemAdvanced);
  }

  return rules;
}
