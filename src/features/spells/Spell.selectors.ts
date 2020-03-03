import {AppState} from '../../redux/AppState';
import {SpellCastingConfig} from '../../rules/spells/Spell.config';
import {SpellStatus} from './Spell.status';
import {Spell} from 'src/rules/spells/Spell';
import {SpellState, SpellRolls} from './Spell.redux';

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

export const spellRollsFor = (
  state: AppState,
  id: string,
): SpellRolls | undefined => {
  return state.spells.spells[id].roll;
};
