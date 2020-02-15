import {
  SpellFactorRules,
  SpellFactorRuleLevel,
  makeSpellFactorRuleLevel,
} from '../SpellFactor.rules';
import {SpellFactorLevel} from '../SpellFactor.level';
import {spellFactorLabelDuration} from './duration.strings';
import {RulesType} from '../RulesType';

export type DurationRules = SpellFactorRules & {
  standard: DurationRuleLevel[];
  advanced: DurationRuleLevel[];
};

export type DurationRuleLevel = SpellFactorRuleLevel;

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
    const itemStandard: DurationRuleLevel = makeSpellFactorRuleLevel(
      RulesType.duration,
      SpellFactorLevel.standard,
      i * -2,
      {description: spellFactorLabel(SpellFactorLevel.standard, i)},
    );

    rules.standard.push(itemStandard);
  }

  for (let i = 0; i < 6; i++) {
    const itemAdvanced: DurationRuleLevel = makeSpellFactorRuleLevel(
      RulesType.duration,
      SpellFactorLevel.advanced,
      i * -2,
      {description: spellFactorLabel(SpellFactorLevel.advanced, i)},
    );

    rules.advanced.push(itemAdvanced);
  }

  return rules;
}
