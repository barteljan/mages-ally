import {RootAction} from '../../redux/rootReducer';
import {popAction} from '../../navigation/Navigation.actions';
import {filter, map} from 'rxjs/operators';
import {isActionOf} from 'typesafe-actions';
import {Epic, combineEpics} from 'redux-observable';
import {
  selectedYantraAction,
  saveSpellAction,
  saveSpellError,
} from './Spell.redux';
import {AppState} from '../../redux/AppState';
import {spellState} from './edit/AddSpell.selectors';
import {showMessage} from 'react-native-flash-message';
import {localization} from './edit/EditSpell.strings';
import {theme} from '../../layout/Theme';

const setYantraEpic: Epic<RootAction, RootAction, AppState> = action$ =>
  action$.pipe(
    filter(isActionOf(selectedYantraAction)),
    map(_ => {
      return popAction();
    }),
  );

const saveSpellEpic: Epic<RootAction, RootAction, AppState> = (
  action$,
  state$,
) =>
  action$.pipe(
    filter(isActionOf(saveSpellAction)),
    map(action => {
      const state = spellState(state$.value, action.payload.parent);
      if (
        state &&
        state.spellCastingConfig.title &&
        state.spellCastingConfig.title.length > 0
      ) {
        return popAction();
      }
      showMessage({
        message: localization.warning_enter_title_for_this_spell,
        backgroundColor: theme.colors.error,
      });
      return saveSpellError(
        action.payload.parent,
        localization.warning_enter_title_for_this_spell,
      );
    }),
  );

export const spellsEpic = combineEpics(setYantraEpic, saveSpellEpic);
