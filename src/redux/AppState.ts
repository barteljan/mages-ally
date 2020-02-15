import {RollDiceState} from '../features/roll-dice/RollDice.redux';
import {RollsState} from '../features/rolls/Rolls.redux';
import {DiceRollAgainType} from '../rules/dice-roll/DiceRollAgainType';

export type AppState = {
  rollDice: RollDiceState;
  rolls: RollsState;
};

export function makeAppState(): AppState {
  return {
    rollDice: {
      currentRollId: null,
      exceptionalSuccessAt: 5,
      numberOfDice: 3,
      rollAgainType: DiceRollAgainType.tenAgain,
    },
    rolls: {
      diceRolls: {},
      list: [],
    },
  };
}
