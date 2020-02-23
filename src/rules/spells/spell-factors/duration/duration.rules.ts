import {
  SpellFactorRules,
  SpellFactorRuleLevel,
  makeSpellFactorRuleLevel,
} from '../SpellFactor.rules';
import {SpellFactorLevel} from '../SpellFactor.level';
import {SpellFactorType} from '../SpellFactor.type';

export type DurationRules = SpellFactorRules<SpellFactorType.duration> & {
  standard: DurationRuleLevel[];
  advanced: DurationRuleLevel[];
};

export type DurationRuleLevel = SpellFactorRuleLevel<SpellFactorType.duration>;

export function makeDurationRules(
  primaryFactor: SpellFactorType,
  magesHighestArcanaValue: number,
): DurationRules {
  let rules: DurationRules = {
    standard: [],
    advanced: [],
  };

  for (let i = 0; i < 5; i++) {
    let adjustedModifier =
      primaryFactor === SpellFactorType.duration
        ? i * -2 + (magesHighestArcanaValue - 1) * 2
        : i * -2;

    if (adjustedModifier > 0) {
      adjustedModifier = 0;
    }

    const itemStandard: DurationRuleLevel = makeSpellFactorRuleLevel(
      SpellFactorLevel.standard,
      adjustedModifier,
      SpellFactorType.duration,
      i,
    );

    rules.standard.push(itemStandard);
  }

  for (let i = 0; i < 6; i++) {
    let adjustedModifier =
      primaryFactor === SpellFactorType.duration
        ? i * -2 + (magesHighestArcanaValue - 1) * 2
        : i * -2;

    if (adjustedModifier > 0) {
      adjustedModifier = 0;
    }

    const itemAdvanced: DurationRuleLevel = makeSpellFactorRuleLevel(
      SpellFactorLevel.advanced,
      adjustedModifier,
      SpellFactorType.duration,
      i,
    );

    //indifinite costs an additional reach and a mana
    if (i === 5) {
      itemAdvanced.reachModifier = 2;
      itemAdvanced.manaModifier = 1;
    }

    rules.advanced.push(itemAdvanced);
  }

  return rules;
}
