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

export const rollDicesEpic: Epic<any, RollDiceActions, AppState> = action$ =>
  action$.pipe(
    ofType(RollDiceActionTypes.rollDices),
    map((action: RollDiceAction) => {
      const rolled = rollDice(action.payload.config);
      return didRollDicesAction(rolled);
    }),
  );
