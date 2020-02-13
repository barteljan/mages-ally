import {SpellFactorLevel} from '../SpellFactor.level';
import {spellFactorLabelScale} from './scale.strings';
import {SpellFactorRuleLevel, SpellFactorRules} from '../SpellFactor.rules';

export interface ScaleRuleLevel extends SpellFactorRuleLevel {
  numberOfSubjects: number;
  sizeOfLargestSubject: number;
  description: string;
  diceModifier: number;
}

export interface ScaleRules extends SpellFactorRules {
  standard: ScaleRuleLevel[];
  advanced: ScaleRuleLevel[];
}

export function makeScaleRules(
  numberOfAdvancedLevels: number = 6,
  spellFactorLabel: (
    level: SpellFactorLevel,
    value: number,
  ) => string = spellFactorLabelScale,
): ScaleRules {
  let scaleRules: ScaleRules = {
    standard: [
      {
        numberOfSubjects: 1,
        sizeOfLargestSubject: 5,
        description: spellFactorLabel(SpellFactorLevel.standard, 0),
        diceModifier: 0,
      },
      {
        numberOfSubjects: 2,
        sizeOfLargestSubject: 6,
        description: spellFactorLabel(SpellFactorLevel.standard, 1),
        diceModifier: -2,
      },
      {
        numberOfSubjects: 4,
        sizeOfLargestSubject: 7,
        description: spellFactorLabel(SpellFactorLevel.standard, 2),
        diceModifier: -4,
      },
      {
        numberOfSubjects: 8,
        sizeOfLargestSubject: 8,
        description: spellFactorLabel(SpellFactorLevel.standard, 3),
        diceModifier: -6,
      },
      {
        numberOfSubjects: 16,
        sizeOfLargestSubject: 9,
        description: spellFactorLabel(SpellFactorLevel.standard, 4),
        diceModifier: -8,
      },
    ],
    advanced: [
      {
        numberOfSubjects: 5,
        sizeOfLargestSubject: 5,
        description: spellFactorLabel(SpellFactorLevel.advanced, 0),
        diceModifier: 0,
      },
    ],
  };

  let subjects = scaleRules.advanced[0].numberOfSubjects;
  let size = scaleRules.advanced[0].numberOfSubjects;

  for (let i = 1; i < numberOfAdvancedLevels; i++) {
    subjects = subjects * 2;
    size = size + 5;
    const description = spellFactorLabel(SpellFactorLevel.advanced, i);

    scaleRules.advanced.push({
      numberOfSubjects: subjects,
      sizeOfLargestSubject: size,
      description,
      diceModifier: i * -2,
    });
  }
  return scaleRules;
}
