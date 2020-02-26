import {RootAction} from '../../redux/rootReducer';
import {popAction} from '../../navigation/Navigation.actions';
import {filter, map} from 'rxjs/operators';
import {isActionOf} from 'typesafe-actions';
import {Epic, combineEpics} from 'redux-observable';
import {selectedYantraAction} from './Spell.redux';
import {AppState} from '../../redux/AppState';

const setYantraEpic: Epic<RootAction, RootAction, AppState> = action$ =>
  action$.pipe(
    filter(isActionOf(selectedYantraAction)),
    map(_ => {
      return popAction();
    }),
  );

export const spellsEpic = combineEpics(setYantraEpic);
