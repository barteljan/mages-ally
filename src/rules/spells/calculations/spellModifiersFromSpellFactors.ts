import StringMap from '../../../data-types/StringMap';
import {
  makePotencyRules,
  PotencyRuleLevel,
  PotencyRules,
} from '../spell-factors/potency/potency.rules';
import {
  makeCastingTimeRules,
  CastingTimeRules,
  CastingTimeRuleLevel,
} from '../spell-factors/casting-time/castingTime.rules';
import {
  makeDurationRules,
  DurationRules,
  DurationRuleLevel,
} from '../spell-factors/duration/duration.rules';
import {makeRangeRules, RangeRules} from '../spell-factors/range/range.rules';
import {
  makeScaleRules,
  ScaleRules,
  ScaleRuleLevel,
} from '../spell-factors/scale/scale.rules';
import {BaseDiceModifier} from 'src/rules/model/BaseDiceModifier';
import {SpellFactorType} from '../spell-factors/SpellFactor.type';
import {CharactersArcanum} from '../../character/CharactersArcanum';
import {
  SpellSpecification,
  SpellSpecificationAdditionalSpecs,
} from '../Spell.config.specification';

export type SpellModifiersFromSpellFactorsReturn = {
  [SpellFactorType.castingTime]: CastingTimeRuleLevel;
  [SpellFactorType.duration]: DurationRuleLevel;
  [SpellFactorType.potency]: PotencyRuleLevel;
  [SpellFactorType.range]: ScaleRuleLevel;
  [SpellFactorType.scale]: ScaleRuleLevel;
};

export function spellModifiersFromSpellFactors(
  highestArcanum: CharactersArcanum,
  primaryFactor: SpellFactorType,
  additionalSpecs: SpellSpecificationAdditionalSpecs,
  factors: SpellSpecification['spellFactors'],
  potencyRules: PotencyRules = makePotencyRules(11),
  castingTimeRules: CastingTimeRules = makeCastingTimeRules(),
  durationRules: DurationRules = makeDurationRules(),
  rangeRules: RangeRules = makeRangeRules(),
  scaleRules: ScaleRules = makeScaleRules(11),
): SpellModifiersFromSpellFactorsReturn {
  const {potency, castingTime, duration, range, scale} = factors;
  let modifier: StringMap<BaseDiceModifier> = {};

  const allFactors = [potency, castingTime, duration, range, scale];
  const rules = [
    potencyRules,
    castingTimeRules,
    durationRules,
    rangeRules,
    scaleRules,
  ];

  for (let i = 0; i < rules.length; i++) {
    const spellFactor = allFactors[i];
    const rulings = rules[i];

    let rule = rulings[spellFactor.level][spellFactor.value - 1];

    // primary factors dice penalty is is reduced by the level of
    // the characters highest arcanum nessecary for this spell
    if (rule.spellFactorType === primaryFactor) {
      let newModifier = rule.diceModifier + highestArcanum.diceModifier * 2 - 2;
      if (newModifier > 0) {
        newModifier = 0;
      }
      rule = {
        ...rule,
        diceModifier: newModifier,
      };
    }

    // everywhere => advanced scale costs a mana instead of a reach
    if (
      additionalSpecs.everywhere === true &&
      rule.spellFactorType === SpellFactorType.scale
    ) {
      rule = {
        ...rule,
        reachModifier: 0,
        manaModifier: 1,
      };
    }

    // time in a bottle => advanced casting time costs a mana instead of a reach
    if (
      additionalSpecs.timeInABottle === true &&
      rule.spellFactorType === SpellFactorType.castingTime
    ) {
      rule = {
        ...rule,
        reachModifier: 0,
        manaModifier: 1,
      };
    }

    modifier[rule.id] = rule;
  }

  return (modifier as unknown) as SpellModifiersFromSpellFactorsReturn;
}
