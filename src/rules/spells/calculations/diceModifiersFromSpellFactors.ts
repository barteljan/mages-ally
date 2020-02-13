import StringMap from '../../../data-types/StringMap';
import {SpellFactor} from '../spell-factors/SpellFactor';
import {makePotencyRules} from '../spell-factors/potency/potency.rules';
import {makeCastingTimeRules} from '../spell-factors/casting-time/castingTime.rules';
import {GnosisRules} from 'src/rules/gnosis/GnosisRule';
import {makeDurationRules} from '../spell-factors/duration/duration.rules';
import {makeRangeRules} from '../spell-factors/range/range.rules';
import {makeScaleRules} from '../spell-factors/scale/scale.rules';
import {SpellFactorType} from '../spell-factors/SpellFactor.type';
import {spellFactorName} from '../spell-factors/SpellFactor.strings';

export function diceModifiersFromSpellFactors(
  gnosis: number,
  gnosisRules: GnosisRules[],
  factors: {
    potency: SpellFactor;
    castingTime: SpellFactor;
    duration: SpellFactor;
    range: SpellFactor;
    scale: SpellFactor;
  },
  translate: (type: SpellFactorType) => string = spellFactorName,
): StringMap<number> {
  const {potency, castingTime, duration, range, scale} = factors;
  let modifier: StringMap<number> = {};

  const allFactors = [potency, castingTime, duration, range, scale];
  const rules = [
    makePotencyRules(11),
    makeCastingTimeRules(gnosisRules, gnosis),
    makeDurationRules(),
    makeRangeRules(),
    makeScaleRules(11),
  ];

  for (let i = 0; i < rules.length; i++) {
    const item = allFactors[i];
    const rulings = rules[i];
    const rule = rulings[item.level][item.value];
    modifier[translate(item.type) + ' ' + rule.description] = rule.diceModifier;
  }

  return modifier;
}
