import {PersistedState} from 'redux-persist';
import {AppState} from './AppState';
import {makeWisdomValue} from '../rules/character/WisdomValue';
import {DiceRollAgainType} from '../rules/dice-roll/DiceRollAgainType';
import {makeSpellRollState} from '../features/spells/Spell.state';
import {spellFromConfig} from '../rules/spells/calculations/spellFromConfig';
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
  4: (state: PersistedState) => {
    let realState: AppState = {...((state as unknown) as AppState)};
    for (let key in realState.spells.spells) {
      let spellState = realState.spells.spells[key];
      spellState.spell = spellFromConfig(spellState.spellCastingConfig);
    }

    return (realState as unknown) as PersistedState;
  },
  5: (state: PersistedState) => {
    let realState: AppState = {...((state as unknown) as AppState)};
    if (realState.rollDice.rollOneDiceAsChanceDice === undefined) {
      realState.rollDice.rollOneDiceAsChanceDice = false;
    }

    return (realState as unknown) as PersistedState;
  },
};
