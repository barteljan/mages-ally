import {DiceRollOutcome} from './DiceRoll.outcome';
import {DiceRollConfig} from './DiceRoll.config';

/**
 * The result of a dice roll
 */
export type DiceRoll = {
  /**
   * UUID of this dice roll
   */
  id: string;

  /**
   * A describing title for this roll
   */
  title: string;

  /**
   * timestamp when this dice roll was created
   */
  createdAt: number;

  /**
   * configuration used for this roll
   */
  configuration: DiceRollConfig;

  /**
   * rolled dice
   */
  rolledDice: number[];

  /**
   * number of dice rerolled
   */
  numberOfRerolls: number;

  /**
   * number of dice without rerolled dices
   */
  numberWithoutRerolls: number;

  /**
   * number of successes
   */
  successes: number;

  /**
   * outcome (failure/success) of your roll
   */
  outcome: DiceRollOutcome;
};
