import {Routes} from './Routes';
import {createAction, ActionType} from 'typesafe-actions';

export enum NavigationActionTypes {
  navigateTo = 'navigation/navigateTo',
  triggeredNavigation = 'navigation/triggeredNavigation',
  pop = 'navigation/pop',
  popped = 'navigation/popped',
}

export const navigateToAction = createAction(
  NavigationActionTypes.navigateTo,
  (route: Routes, parameters: any = {}) => {
    return {route, parameters};
  },
)();

export const popAction = createAction(NavigationActionTypes.pop, () => {
  return {};
})();

export const poppedAction = createAction(NavigationActionTypes.popped, () => {
  return {};
})();

export const triggeredNavigationAction = createAction(
  NavigationActionTypes.triggeredNavigation,
  (route: Routes, parameters: any) => {
    return {route, parameters};
  },
)();

const actions = {
  navigateToAction,
  triggeredNavigationAction,
  popAction,
  poppedAction,
};

export type NavigationAction = ActionType<typeof actions>;
