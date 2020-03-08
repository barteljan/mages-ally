import {RollDiceState} from '../features/roll-dice/RollDice.redux';
import {RollsState} from '../features/rolls/Rolls.redux';
import {DiceRollAgainType} from '../rules/dice-roll/DiceRollAgainType';
import {
  SpellsState,
  SpellState,
  makeSpellRollState,
} from '../features/spells/Spell.state';
import {makeSpellCastingConfig} from '../rules/spells/Spell.config';
import {SpellStatus} from '../features/spells/Spell.status';
import {spellFromConfig} from '../rules/spells/calculations/spellFromConfig';

export type AppState = {
  rollDice: RollDiceState;
  rolls: RollsState;
  spells: SpellsState;
};

export function makeAppState(): AppState {
  const spellCastingConfig = makeSpellCastingConfig();
  const spell = spellFromConfig(spellCastingConfig);

  const newSpell: SpellState = {
    spellCastingConfig,
    status: SpellStatus.new,
    roll: makeSpellRollState(),
    spell,
  };

  return {
    rollDice: {
      currentRollId: null,
      exceptionalSuccessAt: 5,
      numberOfDice: 3,
      rollAgainType: DiceRollAgainType.tenAgain,
      rollOneDiceAsChanceDice: false,
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
