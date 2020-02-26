import {DiceRollConfig} from './DiceRoll.config';
import {DiceRoll} from './DiceRoll';
import moment from 'moment';
import {DiceRollOutcome} from './DiceRoll.outcome';
import {RandomEngine, random} from '../../random/random';

/**
 * Roll a number of dice - evaluate success, failure, exceptional failure and exceptional success
 * @param configuration Configuration of the roll
 * @param id Id added to the result of the roll
 * @param createdAt CreatedAt unix timestamp of this roll
 * @param randomGenerator A random generator to use for throwing dice (if undefined a MersenneTwister19937-Algorithm is used)
 */
export function rollDice(
  configuration: DiceRollConfig,
  createdAt: number = moment().unix(),
  randomGenerator: RandomEngine | undefined = undefined,
): DiceRoll {
  if (!randomGenerator) {
    randomGenerator = random;
  }

  let initialNumberOfDice = 0;
  for (let modifier in configuration.modifiers) {
    initialNumberOfDice += configuration.modifiers[modifier];
  }
  if (initialNumberOfDice < 1) {
    initialNumberOfDice = 1;
  }

  let rolledDice: number[] = rollMany(
    configuration,
    initialNumberOfDice,
    randomGenerator,
  );

  const successes = rolledDice.filter(roll => roll >= configuration.difficulty)
    .length;

  const outcome = calculateRollDiceOutcome(
    rolledDice,
    configuration,
    initialNumberOfDice,
  );

  const numberOfRerolls = rolledDice.length - initialNumberOfDice;

  return {
    id: configuration.id,
    title: configuration.title,
    createdAt,
    configuration,
    outcome: outcome,
    rolledDice: rolledDice,
    numberOfRerolls: numberOfRerolls,
    numberWithoutRerolls: initialNumberOfDice,
    successes,
  };
}

/**
 * @hidden
 */
export function calculateRollDiceOutcome(
  rolledDice: number[],
  configuration: DiceRollConfig,
  initialNumberOfDice: number,
): DiceRollOutcome {
  const successes = rolledDice.filter(roll => roll >= configuration.difficulty)
    .length;

  if (successes >= configuration.successesNeededForExceptionalSuccess) {
    return DiceRollOutcome.exceptionalSuccess;
  } else if (
    successes === 0 &&
    initialNumberOfDice === 1 &&
    rolledDice[0] === 1
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
  randomGenerator: RandomEngine,
): number {
  return randomGenerator(
    configuration.diceRange.lowest,
    configuration.diceRange.highest,
  );
}

/**
 * @hidden
 */
export function rollMany(
  configuration: DiceRollConfig,
  numberOfDice: number,
  randomGenerator: RandomEngine,
): number[] {
  let rolledValues: number[] = [];

  //roll once for each dice
  for (let i = 0; i < numberOfDice; i++) {
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
    let reRolledDice: number[] = [];

    let diceToReroll = rolledValues.filter(value =>
      configuration.explodeFor.includes(value),
    );

    while (diceToReroll.length > 0) {
      diceToReroll.forEach(() =>
        reRolledDice.push(rollOnce(configuration, randomGenerator)),
      );

      diceToReroll = reRolledDice.filter(value =>
        configuration.explodeFor.includes(value),
      );
      rolledValues = [...rolledValues, ...reRolledDice];
      reRolledDice = [];
    }
  }

  return rolledValues;
}
