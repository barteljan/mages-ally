import {RollDiceState} from '../features/roll-dice/RollDice.redux';
import {RollsState} from '../features/rolls/Rolls.redux';
import {DiceRollAgainType} from '../rules/dice-roll/DiceRollAgainType';
import {SpellsState, SpellState} from '../features/spells/edit/Spell.redux';
import {makeSpellCastingConfig} from '../rules/spells/Spell.config';
import {SpellStatus} from '../features/spells/edit/Spell.status';

export type AppState = {
  rollDice: RollDiceState;
  rolls: RollsState;
  spells: SpellsState;
};

export function makeAppState(): AppState {
  const newSpell: SpellState = {
    spellCastingConfig: makeSpellCastingConfig(),
    status: SpellStatus.new,
  };

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
    spells: {
      spells: {
        [newSpell.spellCastingConfig.id]: newSpell,
      },
    },
  };
}
