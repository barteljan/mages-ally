import produce from 'immer';
import {ParadoxCircumstances} from '../../../rules/spells/paradox/ParadoxCircumstances';
import {SpellActions, SpellActionTypes} from '../Spell.actions';
import {SpellValueIds} from '../../../rules/spells/spell-values/SpellValueIds';
import {SleeperWitnesses} from '../../../rules/spells/paradox/SleeperWitnesses';

export const paradoxCircumstancesReducer: (
  paradox: ParadoxCircumstances,
  action: SpellActions,
) => ParadoxCircumstances = produce(
  (paradox: ParadoxCircumstances, action: SpellActions): void => {
    if (!Object.values(SpellActionTypes).includes(action.type)) {
      return;
    }

    switch (action.type) {
      case SpellActionTypes.setNumberValue:
        switch (action.payload.identifier) {
          case SpellValueIds.numberOfPreviousParadoxRolls: {
            paradox.previousParadoxRolls = action.payload.value
              ? action.payload.value
              : 0;
            break;
          }
          case SpellValueIds.additionalManaSpendForReducingParadox: {
            paradox.manaSpent = action.payload.value ? action.payload.value : 0;
            break;
          }
        }
        break;
      // TODO: implement additional paradox dice
      case SpellActionTypes.setStringValue:
        switch (action.payload.identifier) {
          case SpellValueIds.sleeperWitnesses:
            paradox.sleeperWitnesses = action.payload.value as SleeperWitnesses;
            break;
        }
        break;
      case SpellActionTypes.setBooleanValue:
        switch (action.payload.identifier) {
          case SpellValueIds.inuredToSpell:
            paradox.inuredToSpell = action.payload.value
              ? action.payload.value
              : false;
            break;
        }
        break;
    }
  },
);
