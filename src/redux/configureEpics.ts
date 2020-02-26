import {EpicMiddleware} from 'redux-observable';
import {AppState} from './AppState';
import {navigationEpic} from '../navigation/Navigation.epic';
import {rollDiceEpic} from '../features/roll-dice/RollDice.epic';
import {RootAction} from './rootReducer';
import {spellsEpic} from '../features/spells/Spell.epic';

export function configureEpics(
  epicMiddleware: EpicMiddleware<RootAction, RootAction, AppState, any>,
) {
  epicMiddleware.run(navigationEpic);
  epicMiddleware.run(rollDiceEpic);
  epicMiddleware.run(spellsEpic);
}
