import {PrimaryFactor} from './PrimaryFactor';
import {ArcanaType} from './ArcanaType';
import {SleeperWitnesses} from './SleeperWitnesses';
import {YantraRules} from './yantra/yantra.rules';
import {
  CharactersArcanum,
  makeCharactersArcanum,
} from '../character/CharactersArcanum';
import {CharacterSkill, makeCharacterSkill} from '../character/CharacterSkill';
import {SpellFactorLevel} from './spell-factors/SpellFactor.level';
import {SpellFactorType} from './spell-factors/SpellFactor.type';
import moment from 'moment';
import uuid from 'uuid';
import StringMap from '../../data-types/StringMap';
import {SpellFactor} from './spell-factors/SpellFactor';
import {DiceModifier} from '../../data-types/DiceModifier';
import {GnosisValue, makeGnosisValue} from '../character/GnosisValue';
import {GameValueType} from '../../GameValueTypes';

export type SpellCaster = {
  gnosis: GnosisValue;
  highestSpellArcanum: CharactersArcanum;
  activeSpells: number;
  additionalSpellCastingDice: StringMap<DiceModifier>;
  spendsWillpower: boolean;
  roteSkill: CharacterSkill;
};

export function makeDefaultSpellCaster(
  spellCaster?: Partial<SpellCaster>,
): SpellCaster {
  return {
    activeSpells: 0,
    additionalSpellCastingDice: {},
    gnosis: makeGnosisValue({value: 1}),
    highestSpellArcanum: makeCharactersArcanum(ArcanaType.death),
    roteSkill: makeCharacterSkill('skill'),
    spendsWillpower: false,
    ...spellCaster,
  };
}

export function makeSpellFactor(
  type: SpellFactorType,
  factor?: Partial<SpellFactor>,
): SpellFactor {
  return {
    id: GameValueType.spellFactor + '_' + type,
    level: SpellFactorLevel.standard,
    spellFactorType: SpellFactorType.castingTime,
    type: GameValueType.spellFactor,
    value: 0,
    ...factor,
  };
}

export type ParadoxCircumstances = {
  inuredToSpell: boolean;
  previousParadoxRolls: number;
  sleeperWitnesses: SleeperWitnesses;
  dedicatedTool: boolean;
  additionalParadoxDice: number;
  manaSpent: number;
};

export function makeParadoxCircumstances(
  paradox?: Partial<ParadoxCircumstances>,
): ParadoxCircumstances {
  return {
    inuredToSpell: false,
    additionalParadoxDice: 0,
    dedicatedTool: false,
    manaSpent: 0,
    previousParadoxRolls: 0,
    sleeperWitnesses: SleeperWitnesses.none,
    ...paradox,
  };
}

export type Subject = {
  resisted: boolean;
  withstandRating?: number;
  numberOfWithstandRatings?: number;
};

export function makeDefaultSubject(subject?: Partial<Subject>): Subject {
  return {
    resisted: false,
    numberOfWithstandRatings: 1,
    withstandRating: 1,
    ...subject,
  };
}

export type SpellSpecification = {
  requiredArcanumValue: number;
  primaryFactor: PrimaryFactor;
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
  yantras: YantraRules[];
};

export function makeDefaultSpellSpecification(
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
    primaryFactor: PrimaryFactor.potency,
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

export type SpellCastingConfig = {
  id: string;
  createdAt: number;
  caster: SpellCaster;
  subject: Subject;
  spell: SpellSpecification;
  paradox: ParadoxCircumstances;
};

export function makeDefaultCastingConfig(
  config?: Partial<SpellCastingConfig>,
  id: string = uuid.v4(),
  createdAt: number = moment().unix(),
): SpellCastingConfig {
  return {
    caster: makeDefaultSpellCaster({}),
    createdAt,
    id,
    paradox: makeParadoxCircumstances({}),
    spell: makeDefaultSpellSpecification({}),
    subject: makeDefaultSubject({}),
    ...config,
  };
}

export type Spell = {
  diceModifiers: StringMap<number>;
};

export function makeSpell(spell: Partial<Spell>): Spell {
  return {
    diceModifiers: {},
    ...spell,
  };
}
