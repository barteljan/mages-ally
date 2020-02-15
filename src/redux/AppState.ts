import {RollDiceState} from '../features/roll-dice/RollDice.redux';
import {RollsState} from '../features/rolls/Rolls.redux';

export type AppState = {
  rollDice: RollDiceState;
  rolls: RollsState;
};
