import {AnyAction} from 'redux';
import {createAppState, AppState} from './AppState';

export function rootReducer(
  state: AppState | undefined,
  action: AnyAction,
): AppState {
  console.log('Action:', action);
  if (state === undefined) {
    return createAppState();
  }
  return state;
}
