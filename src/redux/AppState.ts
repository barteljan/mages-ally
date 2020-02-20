import {RollDiceState} from '../features/roll-dice/RollDice.redux';
import {RollsState} from '../features/rolls/Rolls.redux';
import {DiceRollAgainType} from '../rules/dice-roll/DiceRollAgainType';
import {AddSpellState} from '../features/spells-add/AddSpell.redux';
import {makeSpellCastingConfig} from '../rules/spells/Spell.config';

export type AppState = {
  rollDice: RollDiceState;
  rolls: RollsState;
  addSpell: AddSpellState;
};

export function makeAppState(): AppState {
  return {
    rollDice: {
      currentRollId: null,
      exceptionalSuccessAt: 5,
      numberOfDice: 3,
      rollAgainType: DiceRollAgainType.tenAgain,
    },
    rolls: {
      diceRolls: {},
      list: [],
    },
    addSpell: {
      spellCastingConfig: makeSpellCastingConfig(),
    },
  };
}
