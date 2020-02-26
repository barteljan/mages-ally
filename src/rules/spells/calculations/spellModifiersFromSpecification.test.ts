import {
  makeSpellSpecification,
  makeSpellSpecificationAdditionalSpecs,
} from '../Spell.config.specification';
import {Yantra} from '../yantra/yantra';
import {YantraType} from '../yantra/Yantra.type';
import {GameValueType} from '../../../GameValueTypes';
import {makeCharactersArcanum} from '../../character/CharactersArcanum';
import {ArcanaType} from '../arcana/Arcana.type';
import {spellModifiersFromSpecification} from '../calculations/spellModifiersFromSpecification';
import {makeModifierIdForCustomYantra} from '../yantra/helper/makeModifierIdForCustomYantra';
import * as SpellModifiersFromSpellFactors from './spellModifiersFromSpellFactors';

test('yantras are correcly extracted', () => {
  const highestArcanum = makeCharactersArcanum(ArcanaType.death, {
    diceModifier: 1,
  });

  const demenseYantra: Yantra = {
    id: YantraType.demesne,
    type: GameValueType.yantra,
    diceModifier: 2,
    yantraType: YantraType.demesne,
    fixedDice: true,
    unique: true,
    maxDice: 2,
  };

  const customYantra: Yantra = {
    id: 'custom',
    type: GameValueType.yantra,
    diceModifier: 3,
    yantraType: YantraType.custom,
    fixedDice: false,
    unique: false,
    maxDice: 10,
  };

  const customYantraId = makeModifierIdForCustomYantra(customYantra);

  let specification = makeSpellSpecification({
    yantras: [demenseYantra, customYantra],
  });

  const modifiers = spellModifiersFromSpecification(
    highestArcanum,
    specification,
  );

  expect(modifiers.demesne).toBe(demenseYantra);
  expect(modifiers[customYantraId]).toBe(customYantra);
});

test('spellModifiersFromSpellFactors will be called', () => {
  const highestArcanum = makeCharactersArcanum(ArcanaType.death, {
    diceModifier: 1,
  });

  const spy = jest.spyOn(
    SpellModifiersFromSpellFactors,
    'spellModifiersFromSpellFactors',
  );

  let specification = makeSpellSpecification({});

  spellModifiersFromSpecification(highestArcanum, specification);

  expect(spy).toHaveBeenCalled();
});

test('check that spellModifiersFromSpellFactors will be called', () => {
  const highestArcanum = makeCharactersArcanum(ArcanaType.death, {
    diceModifier: 1,
  });

  const spy = jest.spyOn(
    SpellModifiersFromSpellFactors,
    'spellModifiersFromSpellFactors',
  );

  let specification = makeSpellSpecification({});

  spellModifiersFromSpecification(highestArcanum, specification);

  expect(spy).toHaveBeenCalled();
});

test('extra reach is added correcly', () => {
  const highestArcanum = makeCharactersArcanum(ArcanaType.death, {
    diceModifier: 1,
  });

  let specification = makeSpellSpecification({
    additionalSpecs: makeSpellSpecificationAdditionalSpecs({extraReach: 5}),
  });

  const modifiers = spellModifiersFromSpecification(
    highestArcanum,
    specification,
  );

  expect(modifiers.extraReach).toBeDefined();
  expect(modifiers.extraReach.reachModifier).toBe(5);
});

test('sympatic range costs 1 mana', () => {
  const highestArcanum = makeCharactersArcanum(ArcanaType.death, {
    diceModifier: 1,
  });

  let specification = makeSpellSpecification({
    additionalSpecs: makeSpellSpecificationAdditionalSpecs({
      sympatheticRange: true,
    }),
  });

  const modifiers = spellModifiersFromSpecification(
    highestArcanum,
    specification,
  );

  expect(modifiers.symphaticRange).toBeDefined();
  expect(modifiers.symphaticRange.manaModifier).toBe(1);
});

test('temporal sympathy costs 1 mana', () => {
  const highestArcanum = makeCharactersArcanum(ArcanaType.death, {
    diceModifier: 1,
  });

  let specification = makeSpellSpecification({
    additionalSpecs: makeSpellSpecificationAdditionalSpecs({
      temporalSympathy: true,
    }),
  });

  const modifiers = spellModifiersFromSpecification(
    highestArcanum,
    specification,
  );

  expect(modifiers.temporalSympathy).toBeDefined();
  expect(modifiers.temporalSympathy.manaModifier).toBe(1);
});
