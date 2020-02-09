import {DiceRollOutcome} from './DiceRoll.outcome';
import {DiceRollConfig} from './DiceRoll.config';

/**
 * The result of a dice roll
 */
export interface DiceRoll {
  /**
   * UUID of this dice roll
   */
  id: string;

  /**
   * timestamp when this dice roll was created
   */
  createdAt: number;

  /**
   * configuration used for this roll
   */
  configuration: DiceRollConfig;

  /**
   * rolled dices
   */
  rolledDices: number[];

  /**
   * number of successes
   */
  successes: number;

  /**
   * outcome (failure/success) of your roll
   */
  outcome: DiceRollOutcome;
}
