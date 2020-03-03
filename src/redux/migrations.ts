import {PersistedState} from 'redux-persist';
import {AppState} from './AppState';
import {makeSpellRoll} from '../features/spells/Spell.redux';
export const migrations = {
  2: (state: PersistedState) => {
    let realState: AppState = {...((state as unknown) as AppState)};
    for (let key in realState.spells.spells) {
      if (realState.spells.spells[key].roll === undefined) {
        realState.spells.spells[key].roll = makeSpellRoll();
      }
    }
    return (realState as unknown) as PersistedState;
  },
};
