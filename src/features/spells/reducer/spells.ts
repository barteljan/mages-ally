import produce from 'immer';
import {SpellsState, SpellState, makeSpellRollState} from '../Spell.state';
import {SpellActions, SpellActionTypes} from '../Spell.actions';
import {SpellStatus} from '../Spell.status';
import {makeSpellCastingConfig} from '../../../rules/spells/Spell.config';
import {spellFromConfig} from '../../../rules/spells/calculations/spellFromConfig';
import {spellStateReducer} from './spells[id]';

export const spellsStateReducer = produce(
  (draft: SpellsState, action: SpellActions): void => {
    if (!Object.values(SpellActionTypes).includes(action.type)) {
      return;
    }

    draft.spells[action.payload.parent] = spellStateReducer(
      draft.spells[action.payload.parent],
      action,
    );

    switch (action.type) {
      case SpellActionTypes.saveSpell: {
        let spell = draft.spells[action.payload.parent];
        if (
          spell.spellCastingConfig.title &&
          spell.spellCastingConfig.title.length > 0
        ) {
          spell.status = SpellStatus.saved;
          const newConfig = makeSpellCastingConfig();
          const newSpell = spellFromConfig(newConfig);
          const newSpellState: SpellState = {
            spell: newSpell,
            spellCastingConfig: newConfig,
            roll: makeSpellRollState(),
            status: SpellStatus.new,
          };
          draft.spells[newConfig.id] = newSpellState;
        }
        break;
      }
      case SpellActionTypes.deleteSpell: {
        delete draft.spells[action.payload.parent];
        break;
      }
    }
  },
);
