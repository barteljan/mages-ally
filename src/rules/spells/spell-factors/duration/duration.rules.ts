import {
  SpellFactorRules,
  SpellFactorRuleLevel,
  makeSpellFactorRuleLevel,
} from '../SpellFactor.rules';
import {SpellFactorLevel} from '../SpellFactor.level';
import {RulesType} from '../RulesType';
import {SpellFactorType} from '../SpellFactor.type';

export type DurationRules = SpellFactorRules<SpellFactorType.duration> & {
  standard: DurationRuleLevel[];
  advanced: DurationRuleLevel[];
};

export type DurationRuleLevel = SpellFactorRuleLevel<SpellFactorType.duration>;

export function makeDurationRules(): DurationRules {
  let rules: DurationRules = {
    standard: [],
    advanced: [],
  };

  for (let i = 0; i < 5; i++) {
    const itemStandard: DurationRuleLevel = makeSpellFactorRuleLevel(
      RulesType.duration,
      SpellFactorLevel.standard,
      i * -2,
      SpellFactorType.duration,
      i,
    );

    rules.standard.push(itemStandard);
  }

  for (let i = 0; i < 6; i++) {
    const itemAdvanced: DurationRuleLevel = makeSpellFactorRuleLevel(
      RulesType.duration,
      SpellFactorLevel.advanced,
      i * -2,
      SpellFactorType.duration,
      i,
    );

    rules.advanced.push(itemAdvanced);
  }

  return rules;
}
