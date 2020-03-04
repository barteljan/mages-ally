import {PersistedState} from 'redux-persist';
import {AppState} from './AppState';
import {makeSpellRollState} from '../features/spells/Spell.redux';
import {makeWisdomValue} from '../rules/character/WisdomValue';
import {DiceRollAgainType} from '../rules/dice-roll/DiceRollAgainType';
export const migrations = {
  3: (state: PersistedState) => {
    let realState: AppState = {...((state as unknown) as AppState)};
    for (let key in realState.spells.spells) {
      if (realState.spells.spells[key].roll === undefined) {
        realState.spells.spells[key].roll = makeSpellRollState();
      }

      if (
        realState.spells.spells[key].spellCastingConfig.caster.wisdom ===
        undefined
      ) {
        realState.spells.spells[
          key
        ].spellCastingConfig.caster.wisdom = makeWisdomValue();
      }

      if (
        realState.spells.spells[key].spellCastingConfig.spell.rollAgainType ===
        undefined
      ) {
        realState.spells.spells[key].spellCastingConfig.spell.rollAgainType =
          DiceRollAgainType.tenAgain;
      }
    }

    return (realState as unknown) as PersistedState;
  },
};
