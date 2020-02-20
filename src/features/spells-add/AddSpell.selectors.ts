import {AppState} from '../../redux/AppState';
import {SpellCastingConfig} from '../../rules/spells/Spell.config';

export const spellCastingConfig = (state: AppState): SpellCastingConfig =>
  state.addSpell.spellCastingConfig;
