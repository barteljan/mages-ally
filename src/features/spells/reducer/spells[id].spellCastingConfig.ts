import produce from 'immer';
import {SpellActionTypes, SpellActions} from '../Spell.actions';
import {SpellValueIds} from '../../../rules/spells/spell-values/SpellValueIds';
import {SpellCastingConfig} from '../../../rules/spells/Spell.config';
import {spellCasterReducer} from './spells[id].spellCastingConfig.caster';
import {spellSpecificationReducer} from './spells[id].spellCastingConfig.spell';
import {paradoxCircumstancesReducer} from './spells[id].spellCastingConfig.paradox';

export const spellCastingConfigReducer: (
  config: SpellCastingConfig,
  action: SpellActions,
) => SpellCastingConfig = produce(
  (config: SpellCastingConfig, action: SpellActions): void => {
    if (!Object.values(SpellActionTypes).includes(action.type)) {
      return;
    }

    config.caster = spellCasterReducer(config.caster, action);
    config.spell = spellSpecificationReducer(config.spell, action);
    config.paradox = paradoxCircumstancesReducer(config.paradox, action);

    switch (action.type) {
      //set number in config
      case SpellActionTypes.setStringValue:
        switch (action.payload.identifier) {
          case SpellValueIds.title:
            config.title = action.payload.value;
            break;
        }
        break;
    }
  },
);
