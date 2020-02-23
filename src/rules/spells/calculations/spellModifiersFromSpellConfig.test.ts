import {makeSpellCastingConfig} from '../Spell.config';
import {makeSpellCaster} from '../Spell.config.caster';
import {spellModifiersFromSpellConfig} from './spellModifiersFromSpellConfig';
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

test('calls spellModifiersFromCaster', () => {
  let config = makeSpellCastingConfig();

  const spy = jest.spyOn(ModifiersFromCaster, 'spellModifiersFromCaster');

  spellModifiersFromSpellConfig(config);
  expect(spy).toBeCalled();
});

test('calls spellModifiersFromSpecification', () => {
  let config = makeSpellCastingConfig();

  const spy = jest.spyOn(
    ModifiersFromSpecification,
    'spellModifiersFromSpecification',
  );

  spellModifiersFromSpellConfig(config);
  expect(spy).toBeCalled();
});

test('calls spellModifiersFromParadoxCircumstances', () => {
  let config = makeSpellCastingConfig();

  const spy = jest.spyOn(
    ModifiersFromParadoxCircumstances,
    'spellModifiersFromParadoxCircumstances',
  );

  spellModifiersFromSpellConfig(config);
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

  const result = spellModifiersFromSpellConfig(config);

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

  const result = spellModifiersFromSpellConfig(config);

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
    yantras: [
      {
        id: YantraType.roteSkill,
        diceModifier: 4,
        type: GameValueType.yantra,
        yantraType: YantraType.roteSkill,
      },
    ],
  });

  let config = makeSpellCastingConfig(
    {caster, spell: spellSpecification},
    'spells_id',
  );

  const result = spellModifiersFromSpellConfig(config);

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
    yantras: [
      {
        id: YantraType.roteSkill,
        diceModifier: 4,
        type: GameValueType.yantra,
        yantraType: YantraType.roteSkill,
      },
    ],
  });

  let config = makeSpellCastingConfig(
    {caster, spell: spellSpecification},
    'spells_id',
  );

  const result = spellModifiersFromSpellConfig(config);

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
    yantras: [
      {
        id: YantraType.roteSkill,
        diceModifier: 4,
        type: GameValueType.yantra,
        yantraType: YantraType.roteSkill,
      },
    ],
  });

  let config = makeSpellCastingConfig(
    {caster, spell: spellSpecification},
    'spells_id',
  );

  const result = spellModifiersFromSpellConfig(config);

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
    yantras: [
      {
        id: YantraType.roteSkill,
        diceModifier: 4,
        type: GameValueType.yantra,
        yantraType: YantraType.roteSkill,
      },
    ],
  });

  let config = makeSpellCastingConfig(
    {caster, spell: spellSpecification},
    'spells_id',
  );

  const result = spellModifiersFromSpellConfig(config);

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
    yantras: [
      {
        id: YantraType.roteSkill,
        diceModifier: 4,
        type: GameValueType.yantra,
        yantraType: YantraType.roteSkill,
      },
    ],
  });

  let config = makeSpellCastingConfig(
    {caster, spell: spellSpecification},
    'spells_id',
  );

  const result = spellModifiersFromSpellConfig(config);

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

  const result = spellModifiersFromSpellConfig(config);
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

  const result = spellModifiersFromSpellConfig(config);
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

  const result = spellModifiersFromSpellConfig(config);
  expect(result.roll.paradox.number).toBe(2);
});

test('no reach is created with default config', () => {
  let config = makeSpellCastingConfig();
  const result = spellModifiersFromSpellConfig(config);
  expect(result.reaches.needed).toBe(0);
});

test('no paradox dice is created with default config ', () => {
  let config = makeSpellCastingConfig();
  const result = spellModifiersFromSpellConfig(config);
  expect(result.roll.paradox.number).toBe(0);
});

test('two spell casting dice are created with default config (gnosis 1/arkanum 1)', () => {
  let config = makeSpellCastingConfig();
  const result = spellModifiersFromSpellConfig(config);
  expect(result.roll.dices.number).toBe(2);
});
