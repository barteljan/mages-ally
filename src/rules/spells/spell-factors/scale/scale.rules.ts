import {SpellFactorLevel} from '../SpellFactor.level';
import {spellFactorLabelScale} from './scale.strings';
import {
  SpellFactorRuleLevel,
  SpellFactorRules,
  makeSpellFactorRuleLevel,
} from '../SpellFactor.rules';
import {RulesType} from '../RulesType';

export type ScaleRuleLevel = SpellFactorRuleLevel & {
  numberOfSubjects: number;
  sizeOfLargestSubject: number;
};

export function makeScaleRuleLevel(
  level: SpellFactorLevel,
  value: number,
  numberOfSubjects: number,
  sizeOfLargestSubject: number,
  rule?: Partial<ScaleRuleLevel>,
) {
  const factor = makeSpellFactorRuleLevel(RulesType.scale, level, value, {
    ...rule,
  });
  const scaleRule: ScaleRuleLevel = {
    ...factor,
    numberOfSubjects,
    sizeOfLargestSubject,
  };
  return scaleRule;
}

export type ScaleRules = SpellFactorRules & {
  standard: ScaleRuleLevel[];
  advanced: ScaleRuleLevel[];
};

export function makeScaleRules(
  numberOfAdvancedLevels: number = 6,
  spellFactorLabel: (
    level: SpellFactorLevel,
    value: number,
  ) => string = spellFactorLabelScale,
): ScaleRules {
  let scaleRules: ScaleRules = {
    standard: [
      makeScaleRuleLevel(SpellFactorLevel.standard, 0, 1, 5, {
        description: spellFactorLabel(SpellFactorLevel.standard, 0),
      }),
      makeScaleRuleLevel(SpellFactorLevel.standard, -2, 2, 6, {
        description: spellFactorLabel(SpellFactorLevel.standard, 1),
      }),
      makeScaleRuleLevel(SpellFactorLevel.standard, -4, 4, 7, {
        description: spellFactorLabel(SpellFactorLevel.standard, 2),
      }),
      makeScaleRuleLevel(SpellFactorLevel.standard, -6, 8, 8, {
        description: spellFactorLabel(SpellFactorLevel.standard, 3),
      }),
      makeScaleRuleLevel(SpellFactorLevel.standard, -8, 16, 9, {
        description: spellFactorLabel(SpellFactorLevel.standard, 4),
      }),
    ],
    advanced: [
      makeScaleRuleLevel(SpellFactorLevel.advanced, 0, 5, 5, {
        description: spellFactorLabel(SpellFactorLevel.advanced, 0),
      }),
    ],
  };

  let subjects = scaleRules.advanced[0].numberOfSubjects;
  let size = scaleRules.advanced[0].numberOfSubjects;

  for (let i = 1; i < numberOfAdvancedLevels; i++) {
    subjects = subjects * 2;
    size = size + 5;
    const description = spellFactorLabel(SpellFactorLevel.advanced, i);
    scaleRules.advanced.push(
      makeScaleRuleLevel(SpellFactorLevel.advanced, i * -2, subjects, size, {
        description,
      }),
    );
  }
  return scaleRules;
}
