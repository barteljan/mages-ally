import {SpellFactorType} from './spell-factors/SpellFactor.type';
import {SpellFactor, makeSpellFactor} from './spell-factors/SpellFactor';
import {Yantra} from './yantra/yantra';
import {SpellType} from './Spell.type';
import {CharacterSkill} from '../character/CharacterSkill';

export type SpellSpecificationSpellFactors = {
  potency: SpellFactor;
  castingTime: SpellFactor;
  duration: SpellFactor;
  range: SpellFactor;
  scale: SpellFactor;
};

export function makeSpellSpecificationSpellFactors(
  factors?: Partial<SpellSpecificationSpellFactors>,
): SpellSpecificationSpellFactors {
  return {
    castingTime: makeSpellFactor(SpellFactorType.castingTime),
    duration: makeSpellFactor(SpellFactorType.duration),
    potency: makeSpellFactor(SpellFactorType.potency),
    range: makeSpellFactor(SpellFactorType.range),
    scale: makeSpellFactor(SpellFactorType.scale),
    ...factors,
  };
}

export type SpellSpecificationAdditionalSpecs = {
  sympatheticRange: boolean;
  temporalSympathy: boolean;
  timeInABottle: boolean;
  everywhere: boolean;
  extraReach: number;
  changePrimarySpellFactor: boolean;
};

export function makeSpellSpecificationAdditionalSpecs(
  specs?: Partial<SpellSpecificationAdditionalSpecs>,
): SpellSpecificationAdditionalSpecs {
  return {
    everywhere: false,
    extraReach: 0,
    sympatheticRange: false,
    temporalSympathy: false,
    timeInABottle: false,
    changePrimarySpellFactor: false,
    ...specs,
  };
}

export type SpellSpecification = {
  requiredArcanumValue: number;
  type: SpellType;
  roteSkill?: CharacterSkill;
  primaryFactor: SpellFactorType;
  spellFactors: SpellSpecificationSpellFactors;
  additionalSpecs: SpellSpecificationAdditionalSpecs;
  includeParadoxRoll: boolean;
  yantras: Yantra[];
};

export function makeSpellSpecification(
  specification?: Partial<SpellSpecification>,
): SpellSpecification {
  return {
    type: SpellType.improvised,
    additionalSpecs: makeSpellSpecificationAdditionalSpecs(),
    includeParadoxRoll: false,
    primaryFactor: SpellFactorType.potency,
    requiredArcanumValue: 1,
    spellFactors: makeSpellSpecificationSpellFactors(),
    yantras: [],
    ...specification,
  };
}
