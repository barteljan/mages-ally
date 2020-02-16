import {spellModifiersFromSpellFactors} from './spellModifiersFromSpellFactors';
import {makeCharactersArcanum} from '../../character/CharactersArcanum';
import {ArcanaType} from '../arcana/Arcana.type';
import {SpellFactorType} from '../spell-factors/SpellFactor.type';
import {SpellCastingConfig} from '../Spell.config';
import {SpellFactorLevel} from '../spell-factors/SpellFactor.level';
import {makeSpellFactor} from '../spell-factors/SpellFactor';

test('test result has the correct structure', () => {
  const highestArcanum = makeCharactersArcanum(ArcanaType.death, {
    diceModifier: 1,
  });

  const primaryFactor = SpellFactorType.potency;

  const factors: SpellCastingConfig['spell']['spellFactors'] = {
    castingTime: makeSpellFactor(SpellFactorType.castingTime, {
      level: SpellFactorLevel.standard,
      value: 0,
    }),
    duration: makeSpellFactor(SpellFactorType.duration, {
      level: SpellFactorLevel.standard,
      value: 0,
    }),
    potency: makeSpellFactor(SpellFactorType.potency, {
      level: SpellFactorLevel.standard,
      value: 0,
    }),
    range: makeSpellFactor(SpellFactorType.range, {
      level: SpellFactorLevel.standard,
      value: 0,
    }),
    scale: makeSpellFactor(SpellFactorType.scale, {
      level: SpellFactorLevel.standard,
      value: 0,
    }),
  };

  const modifiers = spellModifiersFromSpellFactors(
    highestArcanum,
    primaryFactor,
    factors,
  );

  expect(modifiers.castingTime.diceModifier).toBeDefined();
  expect(modifiers.castingTime.spellFactorType).toBeDefined();
  expect(modifiers.castingTime.level).toBeDefined();
  expect(modifiers.duration.diceModifier).toBeDefined();
  expect(modifiers.duration.spellFactorType).toBeDefined();
  expect(modifiers.duration.level).toBeDefined();
  expect(modifiers.potency.diceModifier).toBeDefined();
  expect(modifiers.potency.spellFactorType).toBeDefined();
  expect(modifiers.potency.level).toBeDefined();
  expect(modifiers.range.diceModifier).toBeDefined();
  expect(modifiers.range.spellFactorType).toBeDefined();
  expect(modifiers.range.level).toBeDefined();
  expect(modifiers.scale.diceModifier).toBeDefined();
  expect(modifiers.scale.spellFactorType).toBeDefined();
  expect(modifiers.scale.level).toBeDefined();
});

test('test result give the correct dice modifiers with primary factor duration', () => {
  const highestArcanum = makeCharactersArcanum(ArcanaType.death, {
    diceModifier: 2,
  });

  const primaryFactor = SpellFactorType.duration;

  const factors: SpellCastingConfig['spell']['spellFactors'] = {
    castingTime: makeSpellFactor(SpellFactorType.castingTime, {
      level: SpellFactorLevel.standard,
      value: 2,
    }),
    duration: makeSpellFactor(SpellFactorType.duration, {
      level: SpellFactorLevel.standard,
      value: 2,
    }),
    potency: makeSpellFactor(SpellFactorType.potency, {
      level: SpellFactorLevel.standard,
      value: 2,
    }),
    range: makeSpellFactor(SpellFactorType.range, {
      level: SpellFactorLevel.standard,
      value: 0,
    }),
    scale: makeSpellFactor(SpellFactorType.scale, {
      level: SpellFactorLevel.standard,
      value: 2,
    }),
  };

  const modifiers = spellModifiersFromSpellFactors(
    highestArcanum,
    primaryFactor,
    factors,
  );

  expect(modifiers.castingTime.diceModifier).toBe(2);
  expect(modifiers.duration.diceModifier).toBe(0);
  expect(modifiers.potency.diceModifier).toBe(-4);
  expect(modifiers.range.diceModifier).toBe(0);
  expect(modifiers.scale.diceModifier).toBe(-4);
});

test('test result give the correct dice modifiers with primary factor potency', () => {
  const highestArcanum = makeCharactersArcanum(ArcanaType.death, {
    diceModifier: 2,
  });

  const primaryFactor = SpellFactorType.potency;

  const factors: SpellCastingConfig['spell']['spellFactors'] = {
    castingTime: makeSpellFactor(SpellFactorType.castingTime, {
      level: SpellFactorLevel.standard,
      value: 2,
    }),
    duration: makeSpellFactor(SpellFactorType.duration, {
      level: SpellFactorLevel.standard,
      value: 2,
    }),
    potency: makeSpellFactor(SpellFactorType.potency, {
      level: SpellFactorLevel.standard,
      value: 2,
    }),
    range: makeSpellFactor(SpellFactorType.range, {
      level: SpellFactorLevel.standard,
      value: 0,
    }),
    scale: makeSpellFactor(SpellFactorType.scale, {
      level: SpellFactorLevel.standard,
      value: 2,
    }),
  };

  const modifiers = spellModifiersFromSpellFactors(
    highestArcanum,
    primaryFactor,
    factors,
  );

  expect(modifiers.castingTime.diceModifier).toBe(2);
  expect(modifiers.duration.diceModifier).toBe(-4);
  expect(modifiers.potency.diceModifier).toBe(0);
  expect(modifiers.range.diceModifier).toBe(0);
  expect(modifiers.scale.diceModifier).toBe(-4);
});
