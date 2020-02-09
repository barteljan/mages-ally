import StringMap from '../../data-types/StringMap';

/**
 * An object defining how a DiceRoll should be made
 */
export interface DiceRollConfig {
  /**
   * all dice providing properties mapped to a number of dices provided by them
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
}

/**
 * make a roll config for a default dice roll
 * @param modifiers all dice providing properties mapped to a number of dices provided by them
 * @param successesNeededForExceptionalSuccess number of successes needed for an exceptional success
 */
export function makeRollConfig(
  modifiers: StringMap<number>,
  successesNeededForExceptionalSuccess: number = 5,
): DiceRollConfig {
  return {
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
 * @param rollFor all dice providing properties mapped to a number of dices provided by them
 * @param successesNeededForExceptionalSuccess number of successes needed for an exceptional success
 */
export function make9AgainRollConfig(
  modifiers: StringMap<number>,
  successesNeededForExceptionalSuccess: number = 5,
): DiceRollConfig {
  return {
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
 * @param rollFor all dice providing properties mapped to a number of dices provided by them
 * @param successesNeededForExceptionalSuccess number of successes needed for an exceptional success
 */
export function make8AgainRollConfig(
  modifiers: StringMap<number>,
  successesNeededForExceptionalSuccess: number = 5,
): DiceRollConfig {
  return {
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
 * @param rollFor all dice providing properties mapped to a number of dices provided by them
 * @param successesNeededForExceptionalSuccess number of successes needed for an exceptional success
 */
export function makeRoteQualityRollConfig(
  modifiers: StringMap<number>,
  successesNeededForExceptionalSuccess: number = 5,
): DiceRollConfig {
  return {
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
