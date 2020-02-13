import {SpellFactorRules} from '../SpellFactor.rules';
import {spellFactorLabelRange} from './range.strings';
import {SpellFactorLevel} from '../SpellFactor.level';

export function makeRangeRules(
  spellFactorLabel: (
    level: SpellFactorLevel,
    value: number,
  ) => string = spellFactorLabelRange,
): SpellFactorRules {
  return {
    standard: [
      {
        description: spellFactorLabel(SpellFactorLevel.standard, 0),
        diceModifier: 0,
      },
    ],
    advanced: [
      {
        description: spellFactorLabel(SpellFactorLevel.standard, 0),
        diceModifier: 0,
      },
    ],
  };
}
