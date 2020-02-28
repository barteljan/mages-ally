import {AppState} from '../redux/AppState';
import {Epic, combineEpics} from 'redux-observable';
import {map, filter} from 'rxjs/operators';
import {
  triggeredNavigationAction,
  NavigationAction,
  navigateToAction,
  popAction,
  poppedAction,
} from './Navigation.actions';
import {navigate, pop} from './Navigation.service';
import {RootAction} from '../redux/rootReducer';
import {isActionOf} from 'typesafe-actions';

const navEpic: Epic<RootAction, RootAction, AppState> = action$ =>
  action$.pipe(
    filter(isActionOf(navigateToAction)),
    map(action => {
      navigate(action.payload.route, action.payload.parameters);
      return triggeredNavigationAction(
        action.payload.route,
        action.payload.parameters,
      );
    }),
  );

export const popEpic: Epic<RootAction, NavigationAction, AppState> = action$ =>
  action$.pipe(
    filter(isActionOf(popAction)),
    map(_ => {
      pop();
      return poppedAction();
    }),
  );

export const navigationEpic = combineEpics(navEpic, popEpic);
