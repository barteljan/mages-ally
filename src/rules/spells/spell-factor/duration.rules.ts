import {SpellFactorRules, SpellFactorRuleLevel} from './SpellFactor.rules';
import {SpellFactorLevel} from './SpellFactor.level';
import {spellFactorLabelDuration} from './duration.strings';

export interface DurationRules extends SpellFactorRules {
  standard: DurationRuleLevel[];
  advanced: DurationRuleLevel[];
}

export interface DurationRuleLevel extends SpellFactorRuleLevel {
  description: string;
}

export function makeDurationRules(
  spellFactorLabel: (
    level: SpellFactorLevel,
    value: number,
  ) => string = spellFactorLabelDuration,
): DurationRules {
  let rules: DurationRules = {
    standard: [],
    advanced: [],
  };

  for (let i = 0; i < 5; i++) {
    const itemStandard: DurationRuleLevel = {
      description: spellFactorLabel(SpellFactorLevel.standard, i),
      diceModifier: i * -2,
    };
    rules.standard.push(itemStandard);
  }

  for (let i = 0; i < 6; i++) {
    const itemAdvanced: DurationRuleLevel = {
      description: spellFactorLabel(SpellFactorLevel.standard, i),
      diceModifier: i * -2,
    };

    rules.advanced.push(itemAdvanced);
  }

  return rules;
}
