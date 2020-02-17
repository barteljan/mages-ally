import {makeSpellCastingConfig} from '../Spell.config';
import {makeSpellCaster} from '../Spell.config.caster';
import {spellModifiersFromSpellConfig} from './spellModifiersFromSpellConfig';
import * as ModifiersFromCaster from './spellModifiersFromCaster';
import * as ModifiersFromSpecification from './spellModifiersFromSpecification';
import {makeGnosisValue} from '../../character/GnosisValue';
import {makeCharactersArcanum} from '../../character/CharactersArcanum';
import {ArcanaType} from '../arcana/Arcana.type';
import {
  makeSpellSpecification,
  makeSpellSpecificationSpellFactors,
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

test('Result should be 9 dices for gnosis 5, mind 4', () => {
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
    42,
  );

  const result = spellModifiersFromSpellConfig(config);

  let dices = result.dices;

  expect(dices).toBe(9);
});

test('Result should be 12 dices for gnosis 5, mind 4, spending willpower', () => {
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
    42,
  );

  const result = spellModifiersFromSpellConfig(config);

  let dices = result.dices;

  expect(dices).toBe(12);
});

test('Result should be 16 dices for gnosis 5, mind 4, spending willpower as a rote with skill 4', () => {
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
    42,
  );

  const result = spellModifiersFromSpellConfig(config);

  let dices = result.dices;

  expect(dices).toBe(16);
});

test('Result should be 12 dices for gnosis 5, mind 4, spending willpower as a rote with skill 4, potency 6', () => {
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
    42,
  );

  const result = spellModifiersFromSpellConfig(config);

  let dices = result.dices;

  expect(dices).toBe(12);
});

test('Result should be 14 dices for gnosis 5, mind 4, spending willpower as a rote with skill 4, potency 6, casting time 3 (90 minutes)', () => {
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
    42,
  );

  const result = spellModifiersFromSpellConfig(config);

  let dices = result.dices;

  expect(dices).toBe(14);
});

test('Result should be 10 dices for gnosis 5, mind 4, spending willpower as a rote with skill 4, potency 6, casting time 3 (90 minutes), duration 3', () => {
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
    42,
  );

  const result = spellModifiersFromSpellConfig(config);

  let dices = result.dices;

  expect(dices).toBe(10);
});

test('Result should be 8 dices for gnosis 5, mind 4, spending willpower as a rote with skill 4, potency 6, casting time 3 (90 minutes), duration 3, scale 2 (2 Persons)', () => {
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
    42,
  );

  const result = spellModifiersFromSpellConfig(config);

  let dices = result.dices;

  expect(dices).toBe(8);
});
