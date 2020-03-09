import {
  makeRollConfig,
  make9AgainRollConfig,
  make8AgainRollConfig,
  makeNoRollAgainRollConfig,
} from './DiceRoll.config';
import StringMap from '../../data-types/StringMap';

test('makeRollConfig return a correct value', () => {
  const rollFor: StringMap<number> = {Wits: 4, Composure: 5};

  const id = 'an_identifier';
  const title = 'an_title';

  const config = makeRollConfig(title, rollFor, false, id, 3);

  expect(config).toBeDefined();
  expect(config.id).toBe(id);
  expect(config.title).toBe(title);
  expect(config.diceRange).toBeDefined();
  expect(config.diceRange.highest).toBe(10);
  expect(config.diceRange.lowest).toBe(1);
  expect(config.difficulty).toBe(8);
  expect(config.explodeOnceFor).toEqual([]);
  expect(config.modifiers).toBe(rollFor);

  expect(config.successesNeededForExceptionalSuccess).toBe(3);
  expect(config.explodeFor).toEqual([10]);
});

test('make9AgainRollConfig return a correct value', () => {
  const rollFor: StringMap<number> = {Wits: 4, Composure: 5};

  const id = 'an_identifier';
  const title = 'an_title';

  const config = make9AgainRollConfig(title, rollFor, false, id, 3);

  expect(config).toBeDefined();
  expect(config.id).toBe(id);
  expect(config.title).toBe(title);
  expect(config.diceRange).toBeDefined();
  expect(config.diceRange.highest).toBe(10);
  expect(config.diceRange.lowest).toBe(1);
  expect(config.difficulty).toBe(8);
  expect(config.explodeOnceFor).toEqual([]);
  expect(config.modifiers).toBe(rollFor);

  expect(config.successesNeededForExceptionalSuccess).toBe(3);
  expect(config.explodeFor).toEqual([9, 10]);
});

test('make8AgainRollConfig return a correct value', () => {
  const rollFor: StringMap<number> = {Wits: 4, Composure: 5};

  const id = 'an_identifier';
  const title = 'an_title';

  const config = make8AgainRollConfig(title, rollFor, false, id, 3);

  expect(config).toBeDefined();
  expect(config.id).toBe(id);
  expect(config.title).toBe(title);
  expect(config.diceRange).toBeDefined();
  expect(config.diceRange.highest).toBe(10);
  expect(config.diceRange.lowest).toBe(1);
  expect(config.difficulty).toBe(8);
  expect(config.explodeOnceFor).toEqual([]);
  expect(config.modifiers).toBe(rollFor);

  expect(config.successesNeededForExceptionalSuccess).toBe(3);
  expect(config.explodeFor).toEqual([8, 9, 10]);
});

test('makeNoRollAgainRollConfig return a correct value', () => {
  const rollFor: StringMap<number> = {Wits: 4, Composure: 5};

  const id = 'an_identifier';
  const title = 'an_title';

  const config = makeNoRollAgainRollConfig(title, rollFor, true, id, 3);

  expect(config).toBeDefined();
  expect(config.id).toBe(id);
  expect(config.title).toBe(title);
  expect(config.diceRange).toBeDefined();
  expect(config.diceRange.highest).toBe(10);
  expect(config.diceRange.lowest).toBe(1);
  expect(config.difficulty).toBe(8);
  expect(config.explodeFor).toEqual([]);

  expect(config.modifiers).toBe(rollFor);

  expect(config.successesNeededForExceptionalSuccess).toBe(3);
  expect(config.explodeOnceFor).toEqual([1, 2, 3, 4, 5, 6, 7]);
});
