import {AppState} from '../../redux/AppState';
import {Epic, ofType} from 'redux-observable';
import {map} from 'rxjs/operators';
import {
  RollDiceActionTypes,
  RollDiceActions,
  RollDiceAction,
  didRollDicesAction,
} from './RollDice.redux';
import {rollDice} from '../../rules/dice-roll/rollDice';
import {showDropDownForDiceRoll} from './helper/showDropDownForDiceRoll';

export const rollDicesEpic: Epic<any, RollDiceActions, AppState> = action$ =>
  action$.pipe(
    ofType(RollDiceActionTypes.rollDices),
    map((action: RollDiceAction) => {
      const rolled = rollDice(action.payload.config);
      showDropDownForDiceRoll(rolled);
      return didRollDicesAction(rolled);
    }),
  );
