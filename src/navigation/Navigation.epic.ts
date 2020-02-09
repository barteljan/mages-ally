import {AppState} from '../redux/AppState';
import {Epic, ofType} from 'redux-observable';
import {map} from 'rxjs/operators';
import {
  NavigationActionTypes,
  NavigateToAction,
  triggeredNavigationAction,
  NavigationAction,
} from './Navigation.actions';
import {navigate} from './Navigation.service';

export const navigationEpic: Epic<any, NavigationAction, AppState> = action$ =>
  action$.pipe(
    ofType(NavigationActionTypes.navigateTo),
    map((action: NavigateToAction) => {
      navigate(action.payload);
      return triggeredNavigationAction(action.payload);
    }),
  );
