import {SpellFactorLevel} from '../SpellFactor.level';
import {
  SpellFactorRuleLevel,
  SpellFactorRules,
  makeSpellFactorRuleLevel,
} from '../SpellFactor.rules';
import {RulesType} from '../RulesType';
import {SpellFactorType} from '../SpellFactor.type';

export type ScaleRules = SpellFactorRules<SpellFactorType.scale> & {
  standard: ScaleRuleLevel[];
  advanced: ScaleRuleLevel[];
};

export type ScaleRuleLevel = SpellFactorRuleLevel<SpellFactorType.scale> & {
  numberOfSubjects: number;
  sizeOfLargestSubject: number;
};

export function makeScaleRuleLevel(
  level: SpellFactorLevel,
  value: number,
  numberOfSubjects: number,
  sizeOfLargestSubject: number,
  index: number,
  rule?: Partial<ScaleRuleLevel>,
) {
  const factor = makeSpellFactorRuleLevel(
    level,
    value,
    SpellFactorType.scale,
    index,
    {
      ...rule,
    },
  );
  const scaleRule: ScaleRuleLevel = {
    ...factor,
    numberOfSubjects,
    sizeOfLargestSubject,
  };
  return scaleRule;
}

export function makeScaleRules(numberOfAdvancedLevels: number = 9): ScaleRules {
  let scaleRules: ScaleRules = {
    standard: [
      makeScaleRuleLevel(SpellFactorLevel.standard, 0, 1, 5, 0),
      makeScaleRuleLevel(SpellFactorLevel.standard, -2, 2, 6, 1),
      makeScaleRuleLevel(SpellFactorLevel.standard, -4, 4, 7, 2),
      makeScaleRuleLevel(SpellFactorLevel.standard, -6, 8, 8, 3),
      makeScaleRuleLevel(SpellFactorLevel.standard, -8, 16, 9, 4),
    ],
    advanced: [makeScaleRuleLevel(SpellFactorLevel.advanced, 0, 5, 5, 0)],
  };

  let subjects = scaleRules.advanced[0].numberOfSubjects;
  let size = scaleRules.advanced[0].numberOfSubjects;

  for (let i = 1; i < numberOfAdvancedLevels; i++) {
    subjects = subjects * 2;
    size = size + 5;

    scaleRules.advanced.push(
      makeScaleRuleLevel(SpellFactorLevel.advanced, i * -2, subjects, size, i),
    );
  }
  return scaleRules;
}
