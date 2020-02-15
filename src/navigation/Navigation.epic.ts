import {AppState} from '../redux/AppState';
import {Epic} from 'redux-observable';
import {map, filter} from 'rxjs/operators';
import {
  triggeredNavigationAction,
  NavigationAction,
  navigateToAction,
} from './Navigation.actions';
import {navigate} from './Navigation.service';
import {RootAction} from '../redux/rootReducer';
import {isActionOf} from 'typesafe-actions';

export const navigationEpic: Epic<
  RootAction,
  NavigationAction,
  AppState
> = action$ =>
  action$.pipe(
    filter(isActionOf(navigateToAction)),
    map(action => {
      navigate(action.payload);
      return triggeredNavigationAction(action.payload);
    }),
  );
