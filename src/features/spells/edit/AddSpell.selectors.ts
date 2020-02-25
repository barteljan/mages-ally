import {AppState} from '../../../redux/AppState';
import {SpellCastingConfig} from '../../../rules/spells/Spell.config';
import {SpellStatus} from '../Spell.status';
import {Spell} from 'src/rules/spells/Spell';

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
