import {
  SpellFactorRules,
  makeSpellFactorRuleLevel,
  SpellFactorRuleLevel,
} from '../SpellFactor.rules';
import {RulesType} from '../RulesType';
import {SpellFactorLevel} from '../SpellFactor.level';
import {SpellFactorType} from '../SpellFactor.type';

export type CastingTimeRules = SpellFactorRules<SpellFactorType.castingTime>;
export type CastingTimeRuleLevel = SpellFactorRuleLevel<
  SpellFactorType.castingTime
>;

export function makeCastingTimeRules(): CastingTimeRules {
  let rules: CastingTimeRules = {
    standard: [],
    advanced: [
      makeSpellFactorRuleLevel(
        RulesType.castingTime,
        SpellFactorLevel.advanced,
        0,
        SpellFactorType.castingTime,
        0,
      ),
    ],
  };

  for (let i = 0; i < 6; i++) {
    const dice = i;
    rules.standard.push(
      makeSpellFactorRuleLevel(
        RulesType.castingTime,
        SpellFactorLevel.standard,
        dice,
        SpellFactorType.castingTime,
        i,
      ),
    );
  }

  return rules;
}
