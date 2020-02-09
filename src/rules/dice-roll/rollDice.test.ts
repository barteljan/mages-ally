import {Engine} from 'random-js';
import {DiceRollConfig} from './DiceRoll.config';
import {
  rollOnce,
  rollMany,
  calculateRollDiceOutcome,
  rollDice,
} from './rollDice';
import {DiceRollOutcome} from './DiceRoll.outcome';
/**
 *  @hidden
 */
function createMockRandomEngine(values: number[]): Engine {
  return {
    next: () => {
      const value = values.shift();
      return value ? value - 1 : 0;
    },
  };
}

test('check that mockRandomEngine works correct', () => {
  let engine = createMockRandomEngine([1, 2, 3]);
  expect(engine.next()).toBe(0);
  expect(engine.next()).toBe(1);
  expect(engine.next()).toBe(2);
});

test('check that rollOnce works correct', () => {
  const config: DiceRollConfig = {
    diceRange: {lowest: 1, highest: 10},
    explodeFor: [],
    explodeOnceFor: [],
    difficulty: 8,
    modifiers: {},
    successesNeededForExceptionalSuccess: 5,
  };

  const engine = createMockRandomEngine([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
  ]);

  expect(rollOnce(config, engine)).toBe(1);
  expect(rollOnce(config, engine)).toBe(2);
  expect(rollOnce(config, engine)).toBe(3);
  expect(rollOnce(config, engine)).toBe(4);
  expect(rollOnce(config, engine)).toBe(5);
  expect(rollOnce(config, engine)).toBe(6);
  expect(rollOnce(config, engine)).toBe(7);
  expect(rollOnce(config, engine)).toBe(8);
  expect(rollOnce(config, engine)).toBe(9);
  expect(rollOnce(config, engine)).toBe(10);
  expect(rollOnce(config, engine)).toBe(1);
  expect(rollOnce(config, engine)).toBe(2);
  expect(rollOnce(config, engine)).toBe(3);
});

test('rollMany works correct with no dice rolls containing a exploding number', () => {
  const config: DiceRollConfig = {
    diceRange: {lowest: 1, highest: 10},
    explodeFor: [10],
    explodeOnceFor: [],
    difficulty: 8,
    modifiers: {exampleModifier: 6},
    successesNeededForExceptionalSuccess: 5,
  };

  const engine = createMockRandomEngine([6, 6, 6, 6, 8, 9]);

  expect(rollMany(config, 6, engine)).toEqual([6, 6, 6, 6, 8, 9]);
});

test('rollMany works correct with a dice roll containing a exploding number', () => {
  const config: DiceRollConfig = {
    diceRange: {lowest: 1, highest: 10},
    explodeFor: [10],
    explodeOnceFor: [],
    difficulty: 8,
    modifiers: {exampleModifier: 6},
    successesNeededForExceptionalSuccess: 5,
  };

  const engine = createMockRandomEngine([6, 6, 6, 6, 8, 10, 7]);

  expect(rollMany(config, 6, engine)).toEqual([6, 6, 6, 6, 8, 10, 7]);
});

test('rollMany works correct with a dice roll containing two exploding numbers in a row', () => {
  const config: DiceRollConfig = {
    diceRange: {lowest: 1, highest: 10},
    explodeFor: [10],
    explodeOnceFor: [],
    difficulty: 8,
    modifiers: {exampleModifier: 6},
    successesNeededForExceptionalSuccess: 5,
  };

  const engine = createMockRandomEngine([6, 6, 6, 6, 8, 10, 10, 7]);

  expect(rollMany(config, 6, engine)).toEqual([6, 6, 6, 6, 8, 10, 10, 7]);
});

test('rollMany works correct with a dice roll with several exploding numbers', () => {
  const config: DiceRollConfig = {
    diceRange: {lowest: 1, highest: 10},
    explodeFor: [10],
    explodeOnceFor: [],
    difficulty: 8,
    modifiers: {exampleModifier: 6},
    successesNeededForExceptionalSuccess: 5,
  };

  const engine = createMockRandomEngine([10, 6, 10, 6, 10, 5, 5, 7, 6]);

  expect(rollMany(config, 6, engine)).toEqual([10, 6, 10, 6, 10, 5, 5, 7, 6]);
});

test('rollMany works correct with a dice roll with 9 again', () => {
  const config: DiceRollConfig = {
    diceRange: {lowest: 1, highest: 10},
    explodeFor: [9, 10],
    explodeOnceFor: [],
    difficulty: 8,
    modifiers: {exampleModifier: 3},
    successesNeededForExceptionalSuccess: 5,
  };

  const engine = createMockRandomEngine([9, 6, 10, 6, 7]);

  expect(rollMany(config, 3, engine)).toEqual([9, 6, 10, 6, 7]);
});

test('rollMany works correct with a dice explodingOnce', () => {
  const config: DiceRollConfig = {
    diceRange: {lowest: 1, highest: 10},
    explodeFor: [],
    explodeOnceFor: [10],
    difficulty: 8,
    modifiers: {exampleModifier: 3},
    successesNeededForExceptionalSuccess: 5,
  };

  const engine = createMockRandomEngine([9, 6, 10, 10]);

  expect(rollMany(config, 3, engine)).toEqual([9, 6, 10, 10]);
});

test('calculateRollDiceOutcome works on success', () => {
  const config: DiceRollConfig = {
    diceRange: {lowest: 1, highest: 10},
    explodeFor: [],
    explodeOnceFor: [10],
    difficulty: 8,
    modifiers: {exampleModifier: 3},
    successesNeededForExceptionalSuccess: 5,
  };

  expect(calculateRollDiceOutcome([5, 8, 9], config, 3)).toEqual(
    DiceRollOutcome.success,
  );
});

test('calculateRollDiceOutcome works on failure', () => {
  const config: DiceRollConfig = {
    diceRange: {lowest: 1, highest: 10},
    explodeFor: [],
    explodeOnceFor: [10],
    difficulty: 8,
    modifiers: {exampleModifier: 3},
    successesNeededForExceptionalSuccess: 5,
  };

  expect(calculateRollDiceOutcome([5, 5, 5], config, 3)).toEqual(
    DiceRollOutcome.failure,
  );
});

test('calculateRollDiceOutcome works on dramatic failure', () => {
  const config: DiceRollConfig = {
    diceRange: {lowest: 1, highest: 10},
    explodeFor: [],
    explodeOnceFor: [10],
    difficulty: 8,
    modifiers: {exampleModifier: 3},
    successesNeededForExceptionalSuccess: 5,
  };

  expect(calculateRollDiceOutcome([1], config, 1)).toEqual(
    DiceRollOutcome.dramaticFailure,
  );
});

test('calculateRollDiceOutcome works on exceptional success', () => {
  const config: DiceRollConfig = {
    diceRange: {lowest: 1, highest: 10},
    explodeFor: [],
    explodeOnceFor: [10],
    difficulty: 8,
    modifiers: {exampleModifier: 5},
    successesNeededForExceptionalSuccess: 5,
  };

  expect(calculateRollDiceOutcome([8, 8, 8, 8, 8], config, 5)).toEqual(
    DiceRollOutcome.exceptionalSuccess,
  );
});

test('rollDice sets id,config and createdAt', () => {
  const config: DiceRollConfig = {
    diceRange: {lowest: 1, highest: 10},
    explodeFor: [],
    explodeOnceFor: [10],
    difficulty: 8,
    modifiers: {exampleModifier: 5},
    successesNeededForExceptionalSuccess: 5,
  };

  const id = 'meineId';
  const createdAt = 12;

  const result = rollDice(config, id, createdAt);
  expect(result).toBeDefined();
  expect(result.id).toBe(id);
  expect(result.createdAt).toBe(createdAt);
  expect(result.configuration).toBe(config);
});

test('rollDice generates id and createdAt if none is given', () => {
  const config: DiceRollConfig = {
    diceRange: {lowest: 1, highest: 10},
    explodeFor: [],
    explodeOnceFor: [10],
    difficulty: 8,
    modifiers: {exampleModifier: 5},
    successesNeededForExceptionalSuccess: 5,
  };

  const result = rollDice(config);
  expect(result).toBeDefined();
  expect(result.id).toBeTruthy();
  expect(result.createdAt).toBeGreaterThan(0);
});

test('rollDice generates different dice rolls on two trys', () => {
  const config: DiceRollConfig = {
    diceRange: {lowest: 1, highest: 10},
    explodeFor: [],
    explodeOnceFor: [10],
    difficulty: 8,
    modifiers: {numberOfDices: 50},
    successesNeededForExceptionalSuccess: 5,
  };

  const result = rollDice(config);
  const result2 = rollDice(config);
  expect(result).toBeDefined();
  expect(result2).toBeDefined();
  expect(result.rolledDices).not.toEqual(result2.rolledDices);
});

test('rollDice generates correct min and max values', () => {
  const config: DiceRollConfig = {
    diceRange: {lowest: 1, highest: 10},
    explodeFor: [],
    explodeOnceFor: [],
    difficulty: 8,
    modifiers: {numberOfDices: 11},
    successesNeededForExceptionalSuccess: 5,
  };

  const engine = createMockRandomEngine([1, 1, 1, 4, 55, 66, 7, 10, 9, 10, 11]);

  const result = rollDice(config, 'id', 4, engine);

  expect(result.rolledDices.filter(dice => dice === 1).length).toBe(4);
  expect(result.rolledDices.filter(dice => dice === 10).length).toBe(2);

  const config2: DiceRollConfig = {
    diceRange: {lowest: 1, highest: 10},
    explodeFor: [],
    explodeOnceFor: [],
    difficulty: 8,
    modifiers: {numberOfDices: 10000},
    successesNeededForExceptionalSuccess: 5,
  };

  const result2 = rollDice(config2, 'id', 4);

  expect(result2.rolledDices.filter(dice => dice === 1).length).toBeGreaterThan(
    0,
  );
  expect(
    result2.rolledDices.filter(dice => dice === 10).length,
  ).toBeGreaterThan(0);
  expect(result2.rolledDices.filter(dice => dice === 11).length).toBe(0);
});

test('rollDice rolls correct number of dice with two positive modifiers', () => {
  const config: DiceRollConfig = {
    diceRange: {lowest: 1, highest: 10},
    explodeFor: [],
    explodeOnceFor: [],
    difficulty: 8,
    modifiers: {modifier1: 4, modifier2: 5},
    successesNeededForExceptionalSuccess: 5,
  };

  const result = rollDice(config);
  expect(result.rolledDices.length).toBe(9);
});

test('roll dice rolls correct number of dice with two positive modifiers and a negative modifier', () => {
  const config: DiceRollConfig = {
    diceRange: {lowest: 1, highest: 10},
    explodeFor: [],
    explodeOnceFor: [],
    difficulty: 8,
    modifiers: {modifier1: 4, modifier2: 12, modifier3: -3},
    successesNeededForExceptionalSuccess: 5,
  };

  const result = rollDice(config);
  expect(result.rolledDices.length).toBe(13);
});

test('rollDice rolls 1 dice when all modifiers are negative', () => {
  const config: DiceRollConfig = {
    diceRange: {lowest: 1, highest: 10},
    explodeFor: [],
    explodeOnceFor: [],
    difficulty: 8,
    modifiers: {modifier1: -4, modifier2: -12, modifier3: -3},
    successesNeededForExceptionalSuccess: 5,
  };

  const result = rollDice(config);
  expect(result.rolledDices.length).toBe(1);
});

test('rollDice rolls 1 dice when sum of modifiers is negative', () => {
  const config: DiceRollConfig = {
    diceRange: {lowest: 1, highest: 10},
    explodeFor: [],
    explodeOnceFor: [],
    difficulty: 8,
    modifiers: {modifier1: 5, modifier2: -12},
    successesNeededForExceptionalSuccess: 5,
  };

  const result = rollDice(config);
  expect(result.rolledDices.length).toBe(1);
});

test('rollDice works correct with no dice rolls containing a exploding number', () => {
  const config: DiceRollConfig = {
    diceRange: {lowest: 1, highest: 10},
    explodeFor: [10],
    explodeOnceFor: [],
    difficulty: 8,
    modifiers: {exampleModifier: 6},
    successesNeededForExceptionalSuccess: 5,
  };

  const engine = createMockRandomEngine([6, 6, 6, 6, 8, 9]);

  expect(rollDice(config, 'id', 1, engine).rolledDices).toEqual([
    6,
    6,
    6,
    6,
    8,
    9,
  ]);
});

test('rollDice works correct with a dice roll containing a exploding number', () => {
  const config: DiceRollConfig = {
    diceRange: {lowest: 1, highest: 10},
    explodeFor: [10],
    explodeOnceFor: [],
    difficulty: 8,
    modifiers: {exampleModifier: 6},
    successesNeededForExceptionalSuccess: 5,
  };

  const engine = createMockRandomEngine([6, 6, 6, 6, 8, 10, 7]);

  expect(rollMany(config, 6, engine)).toEqual([6, 6, 6, 6, 8, 10, 7]);
});

test('rollDice works correct with a dice roll containing two exploding numbers in a row', () => {
  const config: DiceRollConfig = {
    diceRange: {lowest: 1, highest: 10},
    explodeFor: [10],
    explodeOnceFor: [],
    difficulty: 8,
    modifiers: {exampleModifier: 6},
    successesNeededForExceptionalSuccess: 5,
  };

  const engine = createMockRandomEngine([6, 6, 6, 6, 8, 10, 10, 7]);

  expect(rollDice(config, 'id', 1, engine).rolledDices).toEqual([
    6,
    6,
    6,
    6,
    8,
    10,
    10,
    7,
  ]);
});

test('rollDice works correct with a dice roll with several exploding numbers', () => {
  const config: DiceRollConfig = {
    diceRange: {lowest: 1, highest: 10},
    explodeFor: [10],
    explodeOnceFor: [],
    difficulty: 8,
    modifiers: {exampleModifier: 6},
    successesNeededForExceptionalSuccess: 5,
  };

  const engine = createMockRandomEngine([10, 6, 10, 6, 10, 5, 5, 7, 6]);

  expect(rollDice(config, 'id', 1, engine).rolledDices).toEqual([
    10,
    6,
    10,
    6,
    10,
    5,
    5,
    7,
    6,
  ]);
});

test('rollDice works correct with a dice roll with 9 again', () => {
  const config: DiceRollConfig = {
    diceRange: {lowest: 1, highest: 10},
    explodeFor: [9, 10],
    explodeOnceFor: [],
    difficulty: 8,
    modifiers: {exampleModifier: 3},
    successesNeededForExceptionalSuccess: 5,
  };

  const engine = createMockRandomEngine([9, 6, 10, 6, 7]);

  expect(rollDice(config, 'id', 1, engine).rolledDices).toEqual([
    9,
    6,
    10,
    6,
    7,
  ]);
});

test('rollDice works correct with a dice explodingOnce', () => {
  const config: DiceRollConfig = {
    diceRange: {lowest: 1, highest: 10},
    explodeFor: [],
    explodeOnceFor: [10],
    difficulty: 8,
    modifiers: {exampleModifier: 3},
    successesNeededForExceptionalSuccess: 5,
  };

  const engine = createMockRandomEngine([9, 6, 10, 10]);

  expect(rollDice(config, 'id', 1, engine).rolledDices).toEqual([9, 6, 10, 10]);
});

test('rollDice works on success', () => {
  const config: DiceRollConfig = {
    diceRange: {lowest: 1, highest: 10},
    explodeFor: [],
    explodeOnceFor: [],
    difficulty: 8,
    modifiers: {exampleModifier: 3},
    successesNeededForExceptionalSuccess: 5,
  };

  const engine = createMockRandomEngine([9, 6, 10]);
  const result = rollDice(config, 'id', 1, engine);

  expect(result).toBeDefined();
  expect(result.outcome).toEqual(DiceRollOutcome.success);
});

test('rollDice works on failure', () => {
  const config: DiceRollConfig = {
    diceRange: {lowest: 1, highest: 10},
    explodeFor: [],
    explodeOnceFor: [],
    difficulty: 8,
    modifiers: {exampleModifier: 3},
    successesNeededForExceptionalSuccess: 5,
  };

  const engine = createMockRandomEngine([4, 6, 5]);
  const result = rollDice(config, 'id', 1, engine);

  expect(result).toBeDefined();
  expect(result.outcome).toEqual(DiceRollOutcome.failure);
});

test('rollDice works on dramatic failure', () => {
  const config: DiceRollConfig = {
    diceRange: {lowest: 1, highest: 10},
    explodeFor: [],
    explodeOnceFor: [],
    difficulty: 8,
    modifiers: {exampleModifier: 1},
    successesNeededForExceptionalSuccess: 5,
  };

  const engine = createMockRandomEngine([1]);
  const result = rollDice(config, 'id', 1, engine);

  expect(result).toBeDefined();
  expect(result.outcome).toEqual(DiceRollOutcome.dramaticFailure);
});

test('rollDice works on exceptional success', () => {
  const config: DiceRollConfig = {
    diceRange: {lowest: 1, highest: 10},
    explodeFor: [],
    explodeOnceFor: [],
    difficulty: 8,
    modifiers: {exampleModifier: 6},
    successesNeededForExceptionalSuccess: 5,
  };

  const engine = createMockRandomEngine([9, 8, 7, 8, 8, 8]);
  const result = rollDice(config, 'id', 1, engine);

  expect(result).toBeDefined();
  expect(result.outcome).toEqual(DiceRollOutcome.exceptionalSuccess);
});
