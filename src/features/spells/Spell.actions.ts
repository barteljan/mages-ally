import {createAction, ActionType} from 'typesafe-actions';
import {SpellFactorType} from '../../rules/spells/spell-factors/SpellFactor.type';
import {Yantra} from '../../rules/spells/yantra/yantra';
import {SpellFactorLevel} from '../../rules/spells/spell-factors/SpellFactor.level';
import {RollForSpellResult} from '../../rules/spells/roll/rollForSpell';

export enum SpellActionTypes {
  setNumberValue = 'spell/edit/setNumberValue',
  setStringValue = 'spell/edit/setStringValue',
  setBooleanValue = 'spell/edit/setBooleanValue',
  setSpellFactorLevel = 'spell/edit/setSpellFactorLevel',
  setSpellFactorValue = 'spell/edit/setSpellFactorValue',
  deleteYantra = 'spell/edit/deleteYantra',
  selectedYantra = 'spell/edit/selectedYantra',
  setYantraValue = 'spell/edit/setYantraValue',
  saveSpell = 'spell/edit/saveSpell',
  saveSpellError = 'spell/edit/saveSpellError',
  addCustomYantra = 'spell/edit/addCustomYantra',
  addCustomYantraError = 'spell/edit/addCustomYantraError',
  rollSpellDice = 'spell/rollDice',
  didRollSpellDice = 'spell/didRollSpellDice',
  deleteSpell = 'spell/delete',
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

export const setSpellFactorLevelAction = createAction(
  SpellActionTypes.setSpellFactorLevel,
  (factor: SpellFactorType, level: SpellFactorLevel, parent: string) => {
    return {
      factor,
      level,
      parent,
    };
  },
)();

export const setSpellFactorValueAction = createAction(
  SpellActionTypes.setSpellFactorValue,
  (factor: SpellFactorType, value: number, parent: string) => {
    return {
      factor,
      value,
      parent,
    };
  },
)();

export const deleteYantraAction = createAction(
  SpellActionTypes.deleteYantra,
  (id: string, parent: string) => {
    return {
      id,
      parent,
    };
  },
)();

export const selectedYantraAction = createAction(
  SpellActionTypes.selectedYantra,
  (yantra: Yantra, parent: string) => {
    return {
      yantra,
      parent,
    };
  },
)();

export const setYantraValueAction = createAction(
  SpellActionTypes.setYantraValue,
  (identifier: string, value: number, parent: string) => {
    return {
      identifier,
      value,
      parent,
    };
  },
)();

export const saveSpellAction = createAction(
  SpellActionTypes.saveSpell,
  (parent: string) => {
    return {
      parent,
    };
  },
)();

export const saveSpellError = createAction(
  SpellActionTypes.saveSpellError,
  (parent: string, errorMessage: string) => {
    return {
      parent,
      error: errorMessage,
    };
  },
)();

export const addCustomYantra = createAction(
  SpellActionTypes.addCustomYantra,
  (title: string | undefined, value: number, parent: string) => {
    return {
      parent,
      title,
      value,
    };
  },
)();

export const addCustomYantraError = createAction(
  SpellActionTypes.addCustomYantraError,
  (title: string | undefined, value: number, parent: string, error: string) => {
    return {
      parent,
      title,
      value,
      error,
    };
  },
)();

export const rollSpellDiceAction = createAction(
  SpellActionTypes.rollSpellDice,
  (parent: string) => {
    return {
      parent,
    };
  },
)();

export const didRollSpellDiceAction = createAction(
  SpellActionTypes.didRollSpellDice,
  (parent: string, result: RollForSpellResult) => {
    return {
      parent,
      result,
    };
  },
)();

export const deleteSpellAction = createAction(
  SpellActionTypes.deleteSpell,
  (parent: string) => {
    return {
      parent,
    };
  },
)();

const actions = {
  setNumberValueAction,
  setStringValueAction,
  setBooleanValueAction,
  setSpellFactorLevelAction,
  setSpellFactorValueAction,
  deleteYantraAction,
  selectedYantraAction,
  setYantraValueAction,
  saveSpellAction,
  saveSpellError,
  addCustomYantra,
  addCustomYantraError,
  rollSpellDiceAction,
  didRollSpellDiceAction,
  deleteSpellAction,
};

export type SpellActions = ActionType<typeof actions>;
