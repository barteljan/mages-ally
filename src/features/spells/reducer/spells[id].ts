import produce from 'immer';
import {SpellActionTypes, SpellActions} from '../Spell.actions';
import {SpellState} from '../Spell.state';
import {spellFromConfig} from '../../../rules/spells/calculations/spellFromConfig';
import {spellRollStateReducer} from './spells[id].roll';
import {spellCastingConfigReducer} from './spells[id].spellCastingConfig';

export const spellStateReducer = produce(
  (spell: SpellState, action: SpellActions): void => {
    if (!Object.values(SpellActionTypes).includes(action.type)) {
      return;
    }

    spell.roll = spellRollStateReducer(spell.roll, action);
    spell.spellCastingConfig = spellCastingConfigReducer(
      spell.spellCastingConfig,
      action,
    );
    spell.spell = spellFromConfig(spell.spellCastingConfig);
  },
);
