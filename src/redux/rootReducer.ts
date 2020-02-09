import {combineReducers, AnyAction} from 'redux';
import {AppState} from './AppState';
import {rollDiceReducer} from '../features/roll-dice/RollDice.redux';
import {rollsReducer} from '../features/rolls/Rolls.redux';

const combinedReducer = combineReducers<AppState>({
  rollDice: rollDiceReducer,
  rolls: rollsReducer,
});

export const rootReducer = (
  state: AppState | undefined,
  action: AnyAction,
): AppState => {
  return combinedReducer(state, action);
};
