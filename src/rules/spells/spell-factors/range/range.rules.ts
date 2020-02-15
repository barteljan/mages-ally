import {SpellFactorRules, makeSpellFactorRuleLevel} from '../SpellFactor.rules';
import {spellFactorLabelRange} from './range.strings';
import {SpellFactorLevel} from '../SpellFactor.level';
import {RulesType} from '../RulesType';

export function makeRangeRules(
  spellFactorLabel: (
    level: SpellFactorLevel,
    value: number,
  ) => string = spellFactorLabelRange,
): SpellFactorRules {
  return {
    standard: [
      makeSpellFactorRuleLevel(RulesType.range, SpellFactorLevel.standard, 0, {
        description: spellFactorLabel(SpellFactorLevel.standard, 0),
      }),
    ],
    advanced: [
      makeSpellFactorRuleLevel(RulesType.range, SpellFactorLevel.advanced, 0, {
        description: spellFactorLabel(SpellFactorLevel.advanced, 0),
      }),
    ],
  };
}
