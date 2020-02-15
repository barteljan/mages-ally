import {PayloadedAction} from 'src/redux/PayloadedAction';
import {Routes} from './Routes';

export enum NavigationActionTypes {
  navigateTo = 'navigateTo',
  triggeredNavigation = 'triggeredNavigation',
}

export type NavigateToAction = PayloadedAction<
  NavigationActionTypes.navigateTo,
  Routes
>;

export function navigateToAction(route: Routes): NavigateToAction {
  return {
    type: NavigationActionTypes.navigateTo,
    payload: route,
  };
}

export type TriggeredNavigationAction = PayloadedAction<
  NavigationActionTypes.triggeredNavigation,
  Routes
>;

export function triggeredNavigationAction(
  route: Routes,
): TriggeredNavigationAction {
  return {
    type: NavigationActionTypes.triggeredNavigation,
    payload: route,
  };
}

export type NavigationAction = NavigateToAction | TriggeredNavigationAction;
