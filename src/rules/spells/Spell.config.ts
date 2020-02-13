import {PrimaryFactor} from './PrimaryFactor';
import {ArcanaType} from './ArcanaType';
import {SleeperWitnesses} from './SleeperWitnesses';
import {Yantra} from './Yantra';
import {CharactersArcanum} from '../character/CharactersArcanum';
import {CharacterSkill} from '../character/CharacterSkill';
import {SpellFactorLevel} from './spell-factor/SpellFactor.level';
import {SpellFactorType} from './spell-factor/SpellFactor.type';
import moment from 'moment';
import uuid from 'uuid';
import StringMap from '../../data-types/StringMap';

export interface DiceModifier {
  name: string;
  value: number;
}

export interface SpellCaster {
  gnosis: number;
  highestSpellArcanum: CharactersArcanum;
  activeSpells: number;
  additionalSpellCastingDice: StringMap<number>;
  spendsWillpower: boolean;
  roteSkill: CharacterSkill;
}

export function makeDefaultSpellCaster(
  spellCaster?: Partial<SpellCaster>,
): SpellCaster {
  return {
    activeSpells: 0,
    additionalSpellCastingDice: {},
    gnosis: 1,
    highestSpellArcanum: {
      highest: false,
      rulingArcana: false,
      type: ArcanaType.death,
      value: 1,
    },
    roteSkill: {name: '', value: 0},
    spendsWillpower: false,
    ...spellCaster,
  };
}

export interface SpellFactor {
  type: SpellFactorType;
  level: SpellFactorLevel;
  value: number;
}

export function makeSpellFactor(factor?: Partial<SpellFactor>): SpellFactor {
  return {
    level: SpellFactorLevel.standard,
    type: SpellFactorType.castingTime,
    value: 0,
    ...factor,
  };
}

export interface ParadoxCircumstances {
  inuredToSpell: boolean;
  previousParadoxRolls: number;
  sleeperWitnesses: SleeperWitnesses;
  dedicatedTool: boolean;
  additionalParadoxDice: number;
  manaSpent: number;
}

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

export interface Subject {
  resisted: boolean;
  withstandRating?: number;
  numberOfWithstandRatings?: number;
}

export function makeDefaultSubject(subject?: Partial<Subject>): Subject {
  return {
    resisted: false,
    numberOfWithstandRatings: 1,
    withstandRating: 1,
    ...subject,
  };
}

export interface SpellSpecification {
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
  yantras: Yantra[];
}

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
      castingTime: makeSpellFactor({
        type: SpellFactorType.castingTime,
      }),
      duration: makeSpellFactor({
        type: SpellFactorType.duration,
      }),
      potency: makeSpellFactor({
        type: SpellFactorType.potency,
      }),
      range: makeSpellFactor({
        type: SpellFactorType.range,
      }),
      scale: makeSpellFactor({
        type: SpellFactorType.scale,
      }),
    },
    yantras: [],
    ...specification,
  };
}

export interface SpellCastingConfig {
  id: string;
  createdAt: number;
  caster: SpellCaster;
  subject: Subject;
  spell: SpellSpecification;
  paradox: ParadoxCircumstances;
}

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

export interface Spell {
  diceModifiers: StringMap<number>;
}

export function makeSpell(spell: Partial<Spell>): Spell {
  return {
    diceModifiers: {},
    ...spell,
  };
}
