import {AppState} from '../../redux/AppState';
import {Epic} from 'redux-observable';
import {map, filter} from 'rxjs/operators';
import {didRollDiceAction, rollDiceAction} from './RollDice.redux';
import {rollDice} from '../../rules/dice-roll/rollDice';
import {showDropDownForDiceRoll} from './helper/showDropDownForDiceRoll';
import {RootAction} from '../../redux/rootReducer';
import {isActionOf} from 'typesafe-actions';

export const rollDiceEpic: Epic<RootAction, RootAction, AppState> = action$ =>
  action$.pipe(
    filter(isActionOf(rollDiceAction)),
    map(action => {
      const rolled = rollDice(action.payload.config);
      showDropDownForDiceRoll(rolled);
      return didRollDiceAction(rolled);
    }),
  );
