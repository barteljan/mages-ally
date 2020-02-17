import {
  SpellFactorRules,
  makeSpellFactorRuleLevel,
  SpellFactorRuleLevel,
} from '../SpellFactor.rules';
import {SpellFactorLevel} from '../SpellFactor.level';
import {RulesType} from '../RulesType';
import {SpellFactorType} from '../SpellFactor.type';

export type RangeRules = SpellFactorRules<SpellFactorType.range>;
export type RangeRulesLevel = SpellFactorRuleLevel<SpellFactorType.range>;

export function makeRangeRules(): RangeRules {
  return {
    standard: [
      makeSpellFactorRuleLevel(
        SpellFactorLevel.standard,
        0,
        SpellFactorType.range,
        0,
      ),
    ],
    advanced: [
      makeSpellFactorRuleLevel(
        SpellFactorLevel.advanced,
        0,
        SpellFactorType.range,
        0,
      ),
    ],
  };
}
