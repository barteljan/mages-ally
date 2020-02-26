import {makeSpellCastingConfig, SpellCastingConfig} from '../Spell.config';
import {makeSpellCaster} from '../Spell.config.caster';
import {spellFromConfig} from './spellFromConfig';
import * as ModifiersFromCaster from './spellModifiersFromCaster';
import * as ModifiersFromSpecification from './spellModifiersFromSpecification';
import * as ModifiersFromParadoxCircumstances from './spellModifiersFromParadoxCircumstances';
import {makeGnosisValue} from '../../character/GnosisValue';
import {makeCharactersArcanum} from '../../character/CharactersArcanum';
import {ArcanaType} from '../arcana/Arcana.type';
import {
  makeSpellSpecification,
  makeSpellSpecificationSpellFactors,
  makeSpellSpecificationAdditionalSpecs,
} from '../Spell.config.specification';
import {SpellFactorType} from '../spell-factors/SpellFactor.type';
import {SpellType} from '../Spell.type';
import {makeCharacterSkill} from '../../character/CharacterSkill';
import {makeSpellFactor} from '../spell-factors/SpellFactor';
import {YantraType} from '../yantra/Yantra.type';
import {GameValueType} from '../../../GameValueTypes';
import {
  GnosisRules,
  RitualIntervalUnit,
} from '../../../rules/gnosis/GnosisRule';
import {makeRoteYantra} from '../yantra/yantra';

test('calls spellModifiersFromCaster', () => {
  let config = makeSpellCastingConfig();

  const spy = jest.spyOn(ModifiersFromCaster, 'spellModifiersFromCaster');

  spellFromConfig(config);
  expect(spy).toBeCalled();
});

test('calls spellModifiersFromSpecification', () => {
  let config = makeSpellCastingConfig();

  const spy = jest.spyOn(
    ModifiersFromSpecification,
    'spellModifiersFromSpecification',
  );

  spellFromConfig(config);
  expect(spy).toBeCalled();
});

test('calls spellModifiersFromParadoxCircumstances', () => {
  let config = makeSpellCastingConfig();

  const spy = jest.spyOn(
    ModifiersFromParadoxCircumstances,
    'spellModifiersFromParadoxCircumstances',
  );

  spellFromConfig(config);
  expect(spy).toBeCalled();
});

test('Result has 9 dices for gnosis 5, mind 4', () => {
  const caster = makeSpellCaster({
    gnosis: makeGnosisValue({diceModifier: 5}),
    highestSpellArcanum: makeCharactersArcanum(ArcanaType.mind, {
      diceModifier: 4,
      highest: true,
      rulingArcana: true,
    }),
    spendsWillpower: false,
  });

  const spellSpecification = makeSpellSpecification();

  let config = makeSpellCastingConfig(
    {caster, spell: spellSpecification},
    'spells_id',
  );

  const result = spellFromConfig(config);

  let dices = result.roll.dices.number;

  expect(dices).toBe(9);
});

test('Result has 12 dices for gnosis 5, mind 4, spending willpower', () => {
  const caster = makeSpellCaster({
    gnosis: makeGnosisValue({diceModifier: 5}),
    highestSpellArcanum: makeCharactersArcanum(ArcanaType.mind, {
      diceModifier: 4,
      highest: true,
      rulingArcana: true,
    }),
    spendsWillpower: true,
  });

  const spellSpecification = makeSpellSpecification();

  let config = makeSpellCastingConfig(
    {caster, spell: spellSpecification},
    'spells_id',
  );

  const result = spellFromConfig(config);

  let dices = result.roll.dices.number;

  expect(dices).toBe(12);
});

test('Result has 16 dices for gnosis 5, mind 4, spending willpower as a rote with skill 4', () => {
  const caster = makeSpellCaster({
    gnosis: makeGnosisValue({diceModifier: 5}),
    highestSpellArcanum: makeCharactersArcanum(ArcanaType.mind, {
      diceModifier: 4,
      highest: true,
      rulingArcana: true,
    }),
    spendsWillpower: true,
  });

  const spellSpecification = makeSpellSpecification({
    type: SpellType.rote,
    roteSkill: makeCharacterSkill('empathy', {diceModifier: 4}),
    yantras: [makeRoteYantra(4)],
  });

  let config = makeSpellCastingConfig(
    {caster, spell: spellSpecification},
    'spells_id',
  );

  const result = spellFromConfig(config);

  let dices = result.roll.dices.number;

  expect(dices).toBe(16);
});

test('Result has 12 dices for gnosis 5, mind 4, spending willpower as a rote with skill 4, potency 6', () => {
  const caster = makeSpellCaster({
    gnosis: makeGnosisValue({diceModifier: 5}),
    highestSpellArcanum: makeCharactersArcanum(ArcanaType.mind, {
      diceModifier: 4,
      highest: true,
      rulingArcana: true,
    }),
    spendsWillpower: true,
  });

  const spellSpecification = makeSpellSpecification({
    type: SpellType.rote,
    roteSkill: makeCharacterSkill('empathy', {diceModifier: 4}),
    spellFactors: makeSpellSpecificationSpellFactors({
      potency: makeSpellFactor(SpellFactorType.potency, {value: 6}),
    }),
    yantras: [makeRoteYantra(4)],
  });

  let config = makeSpellCastingConfig(
    {caster, spell: spellSpecification},
    'spells_id',
  );

  const result = spellFromConfig(config);

  let dices = result.roll.dices.number;

  expect(dices).toBe(12);
});

test('Result has 14 dices for gnosis 5, mind 4, spending willpower as a rote with skill 4, potency 6, casting time 3 (90 minutes)', () => {
  const caster = makeSpellCaster({
    gnosis: makeGnosisValue({diceModifier: 5}),
    highestSpellArcanum: makeCharactersArcanum(ArcanaType.mind, {
      diceModifier: 4,
      highest: true,
      rulingArcana: true,
    }),
    spendsWillpower: true,
  });

  const spellSpecification = makeSpellSpecification({
    type: SpellType.rote,
    roteSkill: makeCharacterSkill('empathy', {diceModifier: 4}),
    spellFactors: makeSpellSpecificationSpellFactors({
      potency: makeSpellFactor(SpellFactorType.potency, {value: 6}),
      castingTime: makeSpellFactor(SpellFactorType.castingTime, {value: 3}),
    }),
    yantras: [makeRoteYantra(4)],
  });

  let config = makeSpellCastingConfig(
    {caster, spell: spellSpecification},
    'spells_id',
  );

  const result = spellFromConfig(config);

  let dices = result.roll.dices.number;

  expect(dices).toBe(14);
});

test('Result has 10 dices for gnosis 5, mind 4, spending willpower as a rote with skill 4, potency 6, casting time 3 (90 minutes), duration 3', () => {
  const caster = makeSpellCaster({
    gnosis: makeGnosisValue({diceModifier: 5}),
    highestSpellArcanum: makeCharactersArcanum(ArcanaType.mind, {
      diceModifier: 4,
      highest: true,
      rulingArcana: true,
    }),
    spendsWillpower: true,
  });

  const spellSpecification = makeSpellSpecification({
    type: SpellType.rote,
    roteSkill: makeCharacterSkill('empathy', {diceModifier: 4}),
    spellFactors: makeSpellSpecificationSpellFactors({
      potency: makeSpellFactor(SpellFactorType.potency, {value: 6}),
      castingTime: makeSpellFactor(SpellFactorType.castingTime, {value: 3}),
      duration: makeSpellFactor(SpellFactorType.duration, {value: 3}),
    }),
    yantras: [makeRoteYantra(4)],
  });

  let config = makeSpellCastingConfig(
    {caster, spell: spellSpecification},
    'spells_id',
  );

  const result = spellFromConfig(config);

  let dices = result.roll.dices.number;

  expect(dices).toBe(10);
});

test('Result has 8 dices for gnosis 5, mind 4, spending willpower as a rote with skill 4, potency 6, casting time 3 (90 minutes), duration 3, scale 2 (2 Persons)', () => {
  const caster = makeSpellCaster({
    gnosis: makeGnosisValue({diceModifier: 5}),
    highestSpellArcanum: makeCharactersArcanum(ArcanaType.mind, {
      diceModifier: 4,
      highest: true,
      rulingArcana: true,
    }),
    spendsWillpower: true,
  });

  const spellSpecification = makeSpellSpecification({
    type: SpellType.rote,
    roteSkill: makeCharacterSkill('empathy', {diceModifier: 4}),
    spellFactors: makeSpellSpecificationSpellFactors({
      potency: makeSpellFactor(SpellFactorType.potency, {value: 6}),
      castingTime: makeSpellFactor(SpellFactorType.castingTime, {value: 3}),
      duration: makeSpellFactor(SpellFactorType.duration, {value: 3}),
      range: makeSpellFactor(SpellFactorType.range, {value: 1}),
      scale: makeSpellFactor(SpellFactorType.scale, {value: 2}),
    }),
    yantras: [makeRoteYantra(4)],
  });

  let config = makeSpellCastingConfig(
    {caster, spell: spellSpecification},
    'spells_id',
  );

  const result = spellFromConfig(config);

  let dices = result.roll.dices.number;

  expect(dices).toBe(8);
});

test('free reach is calculated correctly for a rote', () => {
  const caster = makeSpellCaster({
    highestSpellArcanum: makeCharactersArcanum(ArcanaType.mind, {
      diceModifier: 4,
    }),
  });

  const spellSpecification = makeSpellSpecification({
    requiredArcanumValue: 2,
    type: SpellType.rote,
    roteSkill: makeCharacterSkill('empathy', {diceModifier: 4}),
  });

  let config = makeSpellCastingConfig(
    {caster, spell: spellSpecification},
    'spells_id',
  );

  const result = spellFromConfig(config);
  expect(result.reaches.free).toBe(5);
});

test('free reach is calculated correctly for a improvised spell', () => {
  const caster = makeSpellCaster({
    highestSpellArcanum: makeCharactersArcanum(ArcanaType.mind, {
      diceModifier: 5,
    }),
  });

  const spellSpecification = makeSpellSpecification({
    requiredArcanumValue: 3,
    type: SpellType.improvised,
    roteSkill: makeCharacterSkill('empathy', {diceModifier: 4}),
  });

  let config = makeSpellCastingConfig(
    {caster, spell: spellSpecification},
    'spells_id',
  );

  const result = spellFromConfig(config);
  expect(result.reaches.free).toBe(3);
});

test('paradox from reach is calculated correctly', () => {
  const caster = makeSpellCaster({
    highestSpellArcanum: makeCharactersArcanum(ArcanaType.mind, {
      diceModifier: 5,
    }),
  });

  const spellSpecification = makeSpellSpecification({
    requiredArcanumValue: 3,
    type: SpellType.improvised,
    roteSkill: makeCharacterSkill('empathy', {diceModifier: 4}),
    additionalSpecs: makeSpellSpecificationAdditionalSpecs({extraReach: 5}),
  });

  let config = makeSpellCastingConfig(
    {caster, spell: spellSpecification},
    'spells_id',
  );

  const result = spellFromConfig(config);
  expect(result.roll.paradox.number).toBe(2);
});

test('no reach is created with default config', () => {
  let config = makeSpellCastingConfig();
  const result = spellFromConfig(config);
  expect(result.reaches.needed).toBe(0);
});

test('no paradox dice is created with default config ', () => {
  let config = makeSpellCastingConfig();
  const result = spellFromConfig(config);
  expect(result.roll.paradox.number).toBe(0);
});

test('two spell casting dice are created with default config (gnosis 1/arkanum 1)', () => {
  let config = makeSpellCastingConfig();
  const result = spellFromConfig(config);
  expect(result.roll.dices.number).toBe(2);
});

const configForArcanumAndReach = (params: {
  gnosis: number;
  highestArcanumValue: number;
  requiredArcanumValue: number;
  reaches: number;
}): SpellCastingConfig =>
  makeSpellCastingConfig(
    {
      caster: makeSpellCaster({
        highestSpellArcanum: makeCharactersArcanum(ArcanaType.mind, {
          diceModifier: params.highestArcanumValue,
        }),
        gnosis: makeGnosisValue({diceModifier: params.gnosis}),
      }),
      spell: makeSpellSpecification({
        requiredArcanumValue: params.requiredArcanumValue,
        type: SpellType.improvised,
        roteSkill: makeCharacterSkill('empathy', {diceModifier: 4}),
        additionalSpecs: makeSpellSpecificationAdditionalSpecs({
          extraReach: params.reaches,
        }),
      }),
    },
    'spells_id',
  );

test('paradox is correctly calculated from reaches and gnosis 1', () => {
  const spell1 = spellFromConfig(
    configForArcanumAndReach({
      gnosis: 1,
      highestArcanumValue: 1,
      requiredArcanumValue: 1,
      reaches: 2,
    }),
  );

  expect(spell1.reaches.free).toBe(1);
  expect(spell1.reaches.needed).toBe(2);
  expect(spell1.roll.paradox.number).toBe(1);

  const spell2 = spellFromConfig(
    configForArcanumAndReach({
      gnosis: 1,
      highestArcanumValue: 1,
      requiredArcanumValue: 1,
      reaches: 3,
    }),
  );

  expect(spell2.reaches.free).toBe(1);
  expect(spell2.reaches.needed).toBe(3);
  expect(spell2.roll.paradox.number).toBe(2);
});

test('paradox is correctly calculated from reaches and gnosis 3', () => {
  const spell1 = spellFromConfig(
    configForArcanumAndReach({
      gnosis: 3,
      highestArcanumValue: 1,
      requiredArcanumValue: 1,
      reaches: 2,
    }),
  );

  expect(spell1.reaches.free).toBe(1);
  expect(spell1.reaches.needed).toBe(2);
  expect(spell1.roll.paradox.number).toBe(2);

  const spell2 = spellFromConfig(
    configForArcanumAndReach({
      gnosis: 3,
      highestArcanumValue: 1,
      requiredArcanumValue: 1,
      reaches: 3,
    }),
  );

  expect(spell2.reaches.free).toBe(1);
  expect(spell2.reaches.needed).toBe(3);
  expect(spell2.roll.paradox.number).toBe(4);
});

test('paradox is correctly calculated from reaches and gnosis 5', () => {
  const spell1 = spellFromConfig(
    configForArcanumAndReach({
      gnosis: 5,
      highestArcanumValue: 1,
      requiredArcanumValue: 1,
      reaches: 2,
    }),
  );

  expect(spell1.reaches.free).toBe(1);
  expect(spell1.reaches.needed).toBe(2);
  expect(spell1.roll.paradox.number).toBe(3);

  const spell2 = spellFromConfig(
    configForArcanumAndReach({
      gnosis: 5,
      highestArcanumValue: 1,
      requiredArcanumValue: 1,
      reaches: 3,
    }),
  );

  expect(spell2.reaches.free).toBe(1);
  expect(spell2.reaches.needed).toBe(3);
  expect(spell2.roll.paradox.number).toBe(6);
});

test('paradox is correctly calculated from reaches and gnosis 7', () => {
  const spell1 = spellFromConfig(
    configForArcanumAndReach({
      gnosis: 7,
      highestArcanumValue: 1,
      requiredArcanumValue: 1,
      reaches: 2,
    }),
  );

  expect(spell1.reaches.free).toBe(1);
  expect(spell1.reaches.needed).toBe(2);
  expect(spell1.roll.paradox.number).toBe(4);

  const spell2 = spellFromConfig(
    configForArcanumAndReach({
      gnosis: 7,
      highestArcanumValue: 1,
      requiredArcanumValue: 1,
      reaches: 3,
    }),
  );

  expect(spell2.reaches.free).toBe(1);
  expect(spell2.reaches.needed).toBe(3);
  expect(spell2.roll.paradox.number).toBe(8);
});

test('paradox is correctly calculated from reaches and gnosis 9', () => {
  const spell1 = spellFromConfig(
    configForArcanumAndReach({
      gnosis: 9,
      highestArcanumValue: 1,
      requiredArcanumValue: 1,
      reaches: 2,
    }),
  );

  expect(spell1.reaches.free).toBe(1);
  expect(spell1.reaches.needed).toBe(2);
  expect(spell1.roll.paradox.number).toBe(5);

  const spell2 = spellFromConfig(
    configForArcanumAndReach({
      gnosis: 9,
      highestArcanumValue: 1,
      requiredArcanumValue: 1,
      reaches: 3,
    }),
  );

  expect(spell2.reaches.free).toBe(1);
  expect(spell2.reaches.needed).toBe(3);
  expect(spell2.roll.paradox.number).toBe(10);
});

test('successesForExceptionalSuccesses is calculated correctly for rote spell', () => {
  const spell = spellFromConfig(
    makeSpellCastingConfig({
      spell: makeSpellSpecification({type: SpellType.rote}),
    }),
  );

  expect(spell.roll.dices.successesForExceptionalSuccess).toBe(5);
  expect(spell.roll.paradox.successesForExceptionalSuccess).toBe(5);
});

test('successesForExceptionalSuccesses is calculated correctly for praxis spell', () => {
  const spell = spellFromConfig(
    makeSpellCastingConfig({
      spell: makeSpellSpecification({type: SpellType.praxis}),
    }),
  );

  expect(spell.roll.dices.successesForExceptionalSuccess).toBe(3);
  expect(spell.roll.paradox.successesForExceptionalSuccess).toBe(5);
});

test('successesForExceptionalSuccesses is calculated correctly for improvised spell', () => {
  const spell = spellFromConfig(
    makeSpellCastingConfig({
      spell: makeSpellSpecification({type: SpellType.improvised}),
    }),
  );

  expect(spell.roll.dices.successesForExceptionalSuccess).toBe(5);
  expect(spell.roll.paradox.successesForExceptionalSuccess).toBe(5);
});

const makeMaxYantrasGnosisRule = (maxYantras: number): GnosisRules => {
  return {
    gnosis: 42,
    ritualInterval: 42,
    ritualIntervalTimeUnit: RitualIntervalUnit.hour,
    manaLimit: 42,
    manaPerTurn: 42,
    traitMax: 42,
    yantrasMax: maxYantras,
    paradoxCreated: 42,
    combinedSpells: 42,
    obsessions: 42,
    highestArcanumMax: 42,
    otherArcanumMax: 42,
  };
};

test('number of yantra is calculated correctly from gnosis rules for gnosis 1', () => {
  const gnosisRules: GnosisRules[] = [makeMaxYantrasGnosisRule(11)];

  const spell = spellFromConfig(
    makeSpellCastingConfig({
      caster: makeSpellCaster({
        gnosis: makeGnosisValue({diceModifier: 1}),
      }),
    }),
    gnosisRules,
  );

  expect(spell.maxYantras).toBe(11);
});

test('number of yantra is calculated correctly from gnosis rules for gnosis 2', () => {
  const gnosisRules: GnosisRules[] = [
    makeMaxYantrasGnosisRule(1),
    makeMaxYantrasGnosisRule(22),
  ];

  const spell = spellFromConfig(
    makeSpellCastingConfig({
      caster: makeSpellCaster({
        gnosis: makeGnosisValue({diceModifier: 2}),
      }),
    }),
    gnosisRules,
  );

  expect(spell.maxYantras).toBe(22);
});
