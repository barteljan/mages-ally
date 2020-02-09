import {AnyAction} from 'redux';
import {EpicMiddleware} from 'redux-observable';
import {AppState} from './AppState';
import {navigationEpic} from '../navigation/Navigation.epic';

export function configureEpics(
  epicMiddleware: EpicMiddleware<AnyAction, AnyAction, AppState, any>,
) {
  epicMiddleware.run(navigationEpic);
}
