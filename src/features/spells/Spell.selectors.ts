import {AppState} from '../../redux/AppState';
import {SpellCastingConfig} from '../../rules/spells/Spell.config';
import {SpellStatus} from './Spell.status';
import {Spell} from '../../rules/spells/Spell';
import {SpellState, SpellRollState} from './Spell.state';
import {DiceRoll} from '../../rules/dice-roll/DiceRoll';
import {
  SpellRollInfoConfig,
  makeSpellRollInfoConfig,
} from './roll/SpellRollInfoConfig';

export const addedSpellCastingConfig = (
  state: AppState,
): SpellCastingConfig | undefined => {
  const spells = state.spells.spells;

  for (let key in spells) {
    const spell = spells[key];
    if (spell.status === SpellStatus.new) {
      return spell.spellCastingConfig;
    }
  }

  return undefined;
};

export const addedSpell = (state: AppState): Spell | undefined => {
  const spells = state.spells.spells;

  for (let key in spells) {
    const spell = spells[key];
    if (spell.status === SpellStatus.new) {
      return spell.spell;
    }
  }

  return undefined;
};

export const spellCastingConfigFor = (
  state: AppState,
  id: string,
): SpellCastingConfig | undefined => {
  if (!state || !state.spells || !state.spells.spells) {
    console.log(
      'cannot resolve SpellCastingConfig spellState for id:' +
        id +
        ' is undefined',
    );
    return undefined;
  }

  const spellState = state.spells.spells[id];
  if (spellState) {
    return spellState.spellCastingConfig;
  }
  return undefined;
};

export const spellFor = (state: AppState, id: string): Spell | undefined => {
  if (!state || !state.spells || !state.spells.spells) {
    console.log(
      'cannot resolve spell spellState for id:' + id + ' is undefined',
    );
    return undefined;
  }

  const spellState = state.spells.spells[id];
  if (spellState) {
    return spellState.spell;
  }
  return undefined;
};

export const spellStateFor = (
  state: AppState,
  id: string,
): SpellState | undefined => {
  return state.spells.spells[id];
};

export const spellRollStateFor = (
  state: AppState,
  id: string,
): SpellRollState | undefined => {
  return state.spells.spells[id].roll;
};

export const diceRollFor = (
  state: AppState,
  id: string | undefined,
): DiceRoll | undefined => {
  if (id) {
    return state.rolls.diceRolls[id];
  }
  return undefined;
};

export const spellRollInfoConfigFor = (
  state: AppState,
  id: string | undefined,
): SpellRollInfoConfig | undefined => {
  if (!id) {
    return undefined;
  }

  const roll: SpellRollState = spellRollStateFor(state, id)!;

  let spellRollInfoConfig: SpellRollInfoConfig | undefined;

  if (roll.containParadoxRollId || roll.paradoxRollId || roll.spellRollId) {
    spellRollInfoConfig = makeSpellRollInfoConfig(roll.config, {
      paradoxRoll: diceRollFor(state, roll.paradoxRollId),
      containParadoxRoll: diceRollFor(state, roll.containParadoxRollId),
      spellRoll: diceRollFor(state, roll.spellRollId),
    });
  }

  return spellRollInfoConfig;
};
