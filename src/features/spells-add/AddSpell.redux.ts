import {SpellCastingConfig} from '../../rules/spells/Spell.config';
import {createAction, ActionType} from 'typesafe-actions';
import produce from 'immer';
import {CharacterValueId} from '../../rules/character/CharacterValue.id';
import {SpellValueIds} from '../../rules/spells/spell-values/SpellValueIds';

export type AddSpellState = {
  spellCastingConfig: SpellCastingConfig;
};

export enum AddSpellActionTypes {
  setNumberValue = 'addSpell/setNumberValue',
  setStringValue = 'addSpell/setStringValue',
}

export const setNumberValueAction = createAction(
  AddSpellActionTypes.setNumberValue,
  (identifier: string, value: number) => {
    return {
      identifier: identifier,
      value: value,
    };
  },
)();

export const setStringValueAction = createAction(
  AddSpellActionTypes.setStringValue,
  (identifier: string, value: string | undefined) => {
    return {
      identifier: identifier,
      value: value,
    };
  },
)();

const actions = {
  setNumberValueAction,
  setStringValueAction,
};

export type AddSpellActions = ActionType<typeof actions>;

export const addSpellReducer = produce(
  (draft: AddSpellState, action: AddSpellActions): void => {
    switch (action.type) {
      //set number in config
      case AddSpellActionTypes.setNumberValue:
        switch (action.payload.identifier) {
          case CharacterValueId.gnosis:
            draft.spellCastingConfig.caster.gnosis.diceModifier =
              action.payload.value;
            break;
        }
        break;
      //set number in config
      case AddSpellActionTypes.setStringValue:
        switch (action.payload.identifier) {
          case SpellValueIds.title:
            draft.spellCastingConfig.title = action.payload.value;
            break;
        }
    }
  },
);
