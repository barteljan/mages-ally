import {RollDiceState} from '../features/roll-dice/RollDice.redux';
import {RollsState} from '../features/rolls/Rolls.redux';

export interface AppState {
  rollDice: RollDiceState;
  rolls: RollsState;
}
