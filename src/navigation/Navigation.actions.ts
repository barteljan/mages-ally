import {Routes} from './Routes';
import {createAction, ActionType} from 'typesafe-actions';

export enum NavigationActionTypes {
  navigateTo = 'navigateTo',
  triggeredNavigation = 'triggeredNavigation',
}

export const navigateToAction = createAction(
  NavigationActionTypes.navigateTo,
  (route: Routes) => route,
)();

export const triggeredNavigationAction = createAction(
  NavigationActionTypes.triggeredNavigation,
  (route: Routes) => route,
)();

const actions = {
  navigateToAction,
  triggeredNavigationAction,
};

export type NavigationAction = ActionType<typeof actions>;
