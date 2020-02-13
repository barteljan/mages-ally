import {AnyAction} from 'redux';
import {EpicMiddleware} from 'redux-observable';
import {AppState} from './AppState';
import {navigationEpic} from '../navigation/Navigation.epic';
import {rollDiceEpic} from '../features/roll-dice/RollDice.epic';

export function configureEpics(
  epicMiddleware: EpicMiddleware<AnyAction, AnyAction, AppState, any>,
) {
  epicMiddleware.run(navigationEpic);
  epicMiddleware.run(rollDiceEpic);
}
