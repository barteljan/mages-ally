import {DiceRollConfig} from './DiceRoll.config';
import {DiceRoll} from './DiceRoll';
import moment from 'moment';
import uuid from 'uuid';
import {DiceRollOutcome} from './DiceRoll.outcome';
import {createEntropy, MersenneTwister19937, integer, Engine} from 'random-js';

/**
 * Roll a number of dices - evaluate success, failure, exceptional failure and exceptional success
 * @param configuration Configuration of the roll
 * @param id Id added to the result of the roll
 * @param createdAt CreatedAt unix timestamp of this roll
 * @param randomGenerator A random generator to use for throwing dices (if undefined a MersenneTwister19937-Algorithm is used)
 */
export function rollDice(
  configuration: DiceRollConfig,
  id: string = uuid.v4(),
  createdAt: number = moment().unix(),
  randomGenerator: Engine | undefined = undefined,
): DiceRoll {
  if (!randomGenerator) {
    const seed = createEntropy();
    randomGenerator = MersenneTwister19937.seedWithArray(seed);
  }

  let initialNumberOfDices = 0;
  for (let modifier in configuration.modifiers) {
    initialNumberOfDices += configuration.modifiers[modifier];
  }
  if (initialNumberOfDices < 1) {
    initialNumberOfDices = 1;
  }

  let rolledDices: number[] = rollMany(
    configuration,
    initialNumberOfDices,
    randomGenerator,
  );

  const successes = rolledDices.filter(roll => roll >= configuration.difficulty)
    .length;

  const outcome = calculateRollDiceOutcome(
    rolledDices,
    configuration,
    initialNumberOfDices,
  );

  return {
    id,
    createdAt,
    configuration,
    outcome: outcome,
    rolledDices: rolledDices,
    successes,
  };
}

/**
 * @hidden
 */
export function calculateRollDiceOutcome(
  rolledDices: number[],
  configuration: DiceRollConfig,
  initialNumberOfDices: number,
): DiceRollOutcome {
  const successes = rolledDices.filter(roll => roll >= configuration.difficulty)
    .length;

  if (successes >= configuration.successesNeededForExceptionalSuccess) {
    return DiceRollOutcome.exceptionalSuccess;
  } else if (
    successes === 0 &&
    initialNumberOfDices === 1 &&
    rolledDices[0] === 1
  ) {
    return DiceRollOutcome.dramaticFailure;
  } else if (successes === 0) {
    return DiceRollOutcome.failure;
  }
  return DiceRollOutcome.success;
}

/**
 * @hidden
 */
export function rollOnce(
  configuration: DiceRollConfig,
  randomGenerator: Engine,
): number {
  const distribution = integer(
    configuration.diceRange.lowest,
    configuration.diceRange.highest,
  );
  return distribution(randomGenerator);
}

/**
 * @hidden
 */
export function rollMany(
  configuration: DiceRollConfig,
  numberOfDices: number,
  randomGenerator: Engine,
): number[] {
  let rolledValues: number[] = [];

  //roll once for each dice
  for (let i = 0; i < numberOfDices; i++) {
    rolledValues.push(rollOnce(configuration, randomGenerator));
  }

  if (configuration.explodeOnceFor.length > 0) {
    // add dice roll for each element exploding once
    rolledValues
      .filter(value => configuration.explodeOnceFor.includes(value))
      .forEach(() =>
        rolledValues.push(rollOnce(configuration, randomGenerator)),
      );
  }

  if (configuration.explodeFor.length > 0) {
    let reRolledDices: number[] = [];

    let dicesToReroll = rolledValues.filter(value =>
      configuration.explodeFor.includes(value),
    );

    while (dicesToReroll.length > 0) {
      dicesToReroll.forEach(() =>
        reRolledDices.push(rollOnce(configuration, randomGenerator)),
      );

      dicesToReroll = reRolledDices.filter(value =>
        configuration.explodeFor.includes(value),
      );
      rolledValues = [...rolledValues, ...reRolledDices];
      reRolledDices = [];
    }
  }

  return rolledValues;
}
