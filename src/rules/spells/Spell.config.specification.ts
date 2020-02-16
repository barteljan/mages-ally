import {SpellFactorType} from './spell-factors/SpellFactor.type';
import {SpellFactor, makeSpellFactor} from './spell-factors/SpellFactor';
import {Yantra} from './yantra/yantra';

export type SpellSpecification = {
  requiredArcanumValue: number;
  primaryFactor: SpellFactorType;
  spellFactors: {
    potency: SpellFactor;
    castingTime: SpellFactor;
    duration: SpellFactor;
    range: SpellFactor;
    scale: SpellFactor;
  };
  additionalProperties: {
    sympatheticRange: boolean;
    temporalSympathy: boolean;
    timeInABottle: boolean;
    everywhere: boolean;
    extraReach: number;
  };
  includeParadoxRoll: boolean;
  yantras: Yantra[];
};

export function makeSpellSpecification(
  specification?: Partial<SpellSpecification>,
): SpellSpecification {
  return {
    additionalProperties: {
      everywhere: false,
      extraReach: 0,
      sympatheticRange: false,
      temporalSympathy: false,
      timeInABottle: false,
    },
    includeParadoxRoll: false,
    primaryFactor: SpellFactorType.potency,
    requiredArcanumValue: 1,
    spellFactors: {
      castingTime: makeSpellFactor(SpellFactorType.castingTime),
      duration: makeSpellFactor(SpellFactorType.duration),
      potency: makeSpellFactor(SpellFactorType.potency),
      range: makeSpellFactor(SpellFactorType.range),
      scale: makeSpellFactor(SpellFactorType.scale),
    },
    yantras: [],
    ...specification,
  };
}
