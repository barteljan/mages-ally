import {AppState} from '../../redux/AppState';
import {Epic, ofType} from 'redux-observable';
import {map} from 'rxjs/operators';
import {
  RollDiceActionTypes,
  RollDiceActions,
  RollDiceAction,
  didRollDiceAction,
} from './RollDice.redux';
import {rollDice} from '../../rules/dice-roll/rollDice';
import {showDropDownForDiceRoll} from './helper/showDropDownForDiceRoll';

export const rollDiceEpic: Epic<any, RollDiceActions, AppState> = action$ =>
  action$.pipe(
    ofType(RollDiceActionTypes.rollDice),
    map((action: RollDiceAction) => {
      const rolled = rollDice(action.payload.config);
      showDropDownForDiceRoll(rolled);
      return didRollDiceAction(rolled);
    }),
  );
