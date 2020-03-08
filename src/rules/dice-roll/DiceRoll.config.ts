import StringMap from '../../data-types/StringMap';
import uuid from 'uuid';

/**
 * An object defining how a DiceRoll should be made
 */
export type DiceRollConfig = {
  /**
   * A id identifieng this dice roll
   */
  id: string;

  /**
   * a title for this dice roll
   */
  title: string;

  /**
   * all dice providing properties mapped to a number of dice provided by them
   */
  modifiers: StringMap<number>;
  /**
   * dice values which should result in an exploding dice roll
   */
  explodeFor: number[];
  /**
   * dice values which should result once in an exploding dice roll
   */
  explodeOnceFor: number[];
  /**
   * number of successes needed for an exceptional success
   */
  successesNeededForExceptionalSuccess: number;

  /**
   * difficulty for this roll (a success is higher or equal than the difficulty)
   */
  difficulty: number;

  /**
   * what is the lowest / highest number a dice can take (normally {lowest: 1, highest: 10} )
   */
  diceRange: {
    lowest: number;
    highest: number;
  };
};

/**
 * make a roll config for a default dice roll
 * @param modifiers all dice providing properties mapped to a number of dice provided by them
 * @param successesNeededForExceptionalSuccess number of successes needed for an exceptional success
 */
export function makeRollConfig(
  title: string,
  modifiers: StringMap<number>,
  id: string = uuid.v4(),
  successesNeededForExceptionalSuccess: number = 5,
): DiceRollConfig {
  return {
    id,
    title,
    modifiers,
    explodeFor: [10],
    explodeOnceFor: [],
    diceRange: {
      lowest: 1,
      highest: 10,
    },
    difficulty: 8,
    successesNeededForExceptionalSuccess,
  };
}

/**
 * make a roll config for a 9 again dice roll
 * @param modifiers all dice providing properties mapped to a number of dice provided by them
 * @param successesNeededForExceptionalSuccess number of successes needed for an exceptional success
 */
export function make9AgainRollConfig(
  title: string,
  modifiers: StringMap<number>,
  id: string = uuid.v4(),
  successesNeededForExceptionalSuccess: number = 5,
): DiceRollConfig {
  return {
    id,
    title,
    modifiers,
    explodeFor: [9, 10],
    explodeOnceFor: [],
    diceRange: {
      lowest: 1,
      highest: 10,
    },
    difficulty: 8,
    successesNeededForExceptionalSuccess,
  };
}

/**
 * make a roll config for a 8 again dice roll
 * @param modifiers all dice providing properties mapped to a number of dice provided by them
 * @param successesNeededForExceptionalSuccess number of successes needed for an exceptional success
 */
export function make8AgainRollConfig(
  title: string,
  modifiers: StringMap<number>,
  id: string = uuid.v4(),
  successesNeededForExceptionalSuccess: number = 5,
): DiceRollConfig {
  return {
    id,
    title,
    modifiers,
    explodeFor: [8, 9, 10],
    explodeOnceFor: [],
    diceRange: {
      lowest: 1,
      highest: 10,
    },
    difficulty: 8,
    successesNeededForExceptionalSuccess,
  };
}

/**
 * make a roll config for a rote quality dice roll
 * @param modifiers all dice providing properties mapped to a number of dice provided by them
 * @param successesNeededForExceptionalSuccess number of successes needed for an exceptional success
 */
export function makeRoteQualityRollConfig(
  title: string,
  modifiers: StringMap<number>,
  id: string = uuid.v4(),
  successesNeededForExceptionalSuccess: number = 5,
): DiceRollConfig {
  return {
    id,
    title,
    modifiers,
    explodeFor: [],
    explodeOnceFor: [1, 2, 3, 4, 5, 6, 7],
    diceRange: {
      lowest: 1,
      highest: 10,
    },
    difficulty: 8,
    successesNeededForExceptionalSuccess,
  };
}

/**
 * make a roll config for a chance dice roll
 */
export function makeChanceDiceConfig(
  title: string,
  id: string = uuid.v4(),
): DiceRollConfig {
  return {
    id,
    title,
    modifiers: {chance: 1},
    explodeFor: [],
    explodeOnceFor: [],
    diceRange: {
      lowest: 1,
      highest: 10,
    },
    difficulty: 10,
    successesNeededForExceptionalSuccess: 5,
  };
}
