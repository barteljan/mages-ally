import {SpellCastingConfig} from '../../rules/spells/Spell.config';
import {createAction, ActionType} from 'typesafe-actions';
import produce from 'immer';
import {CharacterValueId} from '../../rules/character/CharacterValue.id';
import {SpellValueIds} from '../../rules/spells/spell-values/SpellValueIds';
import {ArcanaType} from 'src/rules/spells/arcana/Arcana.type';
import StringMap from 'src/data-types/StringMap';
import {SpellStatus} from './Spell.status';

export type SpellsState = {
  spells: StringMap<SpellState>;
};

export type SpellState = {
  spellCastingConfig: SpellCastingConfig;
  status: SpellStatus;
};

export enum SpellActionTypes {
  setNumberValue = 'spell/edit/setNumberValue',
  setStringValue = 'spell/edit/setStringValue',
  setBooleanValue = 'spell/edit/setBooleanValue',
}

export const setNumberValueAction = createAction(
  SpellActionTypes.setNumberValue,
  (identifier: string, value: number, parent: string) => {
    return {
      identifier,
      value,
      parent,
    };
  },
)();

export const setStringValueAction = createAction(
  SpellActionTypes.setStringValue,
  (identifier: string, value: string | undefined, parent: string) => {
    return {
      identifier,
      value,
      parent,
    };
  },
)();

export const setBooleanValueAction = createAction(
  SpellActionTypes.setBooleanValue,
  (identifier: string, value: boolean, parent: string) => {
    return {
      identifier,
      value,
      parent,
    };
  },
)();

const actions = {
  setNumberValueAction,
  setStringValueAction,
  setBooleanValueAction,
};

export type SpellActions = ActionType<typeof actions>;

export const spellReducer = produce(
  (draft: SpellsState, action: SpellActions): void => {
    switch (action.type) {
      //set number in config
      case SpellActionTypes.setNumberValue:
        switch (action.payload.identifier) {
          case CharacterValueId.gnosis:
            draft.spells[
              action.payload.parent
            ].spellCastingConfig.caster.gnosis.diceModifier =
              action.payload.value;
            break;
          case SpellValueIds.highestArcanumValue:
            draft.spells[
              action.payload.parent
            ].spellCastingConfig.caster.highestSpellArcanum.diceModifier =
              action.payload.value;
            break;
          case SpellValueIds.activeSpells:
            draft.spells[
              action.payload.parent
            ].spellCastingConfig.caster.activeSpells = action.payload.value;
            break;
        }
        break;
      //set number in config
      case SpellActionTypes.setStringValue:
        switch (action.payload.identifier) {
          case SpellValueIds.title:
            draft.spells[action.payload.parent].spellCastingConfig.title =
              action.payload.value;
            break;
          case SpellValueIds.highestArcanum:
            draft.spells[
              action.payload.parent
            ].spellCastingConfig.caster.highestSpellArcanum.arcanumType = action
              .payload.value as ArcanaType;
            break;
        }
        break;
      case SpellActionTypes.setBooleanValue:
        switch (action.payload.identifier) {
          case SpellValueIds.isMagesHighestArcanum:
            draft.spells[
              action.payload.parent
            ].spellCastingConfig.caster.highestSpellArcanum.highest =
              action.payload.value;
            break;
          case SpellValueIds.isMagesRulingArcanum:
            draft.spells[
              action.payload.parent
            ].spellCastingConfig.caster.highestSpellArcanum.rulingArcana =
              action.payload.value;
            break;
        }
        break;
    }
  },
);
