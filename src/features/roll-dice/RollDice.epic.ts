import {AppState} from '../../redux/AppState';
import {Epic, combineEpics} from 'redux-observable';
import {map, filter, mergeMap} from 'rxjs/operators';
import {
  didRollDiceAction,
  rollDiceAction,
  setCurrentRoll,
} from './RollDice.redux';
import {rollDice} from '../../rules/dice-roll/rollDice';
import {RootAction} from '../../redux/rootReducer';
import {isActionOf} from 'typesafe-actions';
import {DiceRollContext} from '../../rules/DiceRollContext';
import {navigateToAction} from '../../navigation/Navigation.actions';
import {Routes} from '../../navigation/Routes';

const rollDicesEpic: Epic<RootAction, RootAction, AppState> = action$ =>
  action$.pipe(
    filter(isActionOf(rollDiceAction)),
    map(action => {
      const rolled = rollDice(action.payload.config);
      /*
      if (action.payload.context === DiceRollContext.rollDice) {
        showDropDownForDiceRoll(rolled);
      }
      */
      return didRollDiceAction(rolled, action.payload.context);
    }),
  );
const openDicesViewEpic: Epic<RootAction, RootAction, AppState> = action$ =>
  action$.pipe(
    filter(isActionOf(setCurrentRoll)),
    mergeMap(action => {
      if (action.payload.context === DiceRollContext.rollsList) {
        return [navigateToAction(Routes.addRoll)];
      }
      return [];
    }),
  );

export const rollDiceEpic = combineEpics(rollDicesEpic, openDicesViewEpic);
