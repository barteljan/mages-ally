import {AppState} from './AppState';
import {
  rollDiceReducer,
  RollDiceActions,
} from '../features/roll-dice/RollDice.redux';
import {rollsReducer} from '../features/rolls/Rolls.redux';

import produce from 'immer';
import {NavigationAction} from '../navigation/Navigation.actions';

export type RootAction = RollDiceActions | NavigationAction;

export const rootReducer = produce((draft: AppState, action: RootAction) => {
  draft.rollDice = rollDiceReducer(draft.rollDice, action as RollDiceActions);
  draft.rolls = rollsReducer(draft.rolls, action as RollDiceActions);
});
