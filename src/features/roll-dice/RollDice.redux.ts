import {DiceRollAgainType} from '../../rules/dice-roll/DiceRollAgainType';
import {DiceRollConfig} from '../../rules/dice-roll/DiceRoll.config';
import {DiceRollContext} from '../../rules/DiceRollContext';
import {DiceRoll} from '../../rules/dice-roll/DiceRoll';
import produce from 'immer';
import {createAction, ActionType, PayloadAction} from 'typesafe-actions';
export type RollDiceState = {
  numberOfDice: number;
  rollAgainType: DiceRollAgainType;
  exceptionalSuccessAt: number;
  currentRollId: string | null;
  rollOneDiceAsChanceDice: boolean;
  roteQuality: boolean;
};
import {isEqual} from 'lodash';

export enum RollDiceActionTypes {
  setNumberOfDice = 'rollDice/setNumberOfDice',
  setRollAgainType = 'rollDice/setRollAgainType',
  setExceptionalSuccessAt = 'rollDice/setExceptionalSuccessAt',
  setRollAsChanceDice = 'rollDice/setRollAsChanceDice',
  setRoteQuality = 'rollDice/setRoteQuality',
  rollDice = 'rollDice/rollDice',
  didRollDice = 'rollDice/didRollDice',
  clearCurrentRoll = 'rollDice/clearCurrentRoll',
  setCurrentRoll = 'rollDice/setCurrentRoll',
  deleteDiceRoll = 'rollDice/delete',
}

export const setNumberOfDiceAction = createAction(
  RollDiceActionTypes.setNumberOfDice,
  (dice: number) => dice,
)();

export const setRollAgainTypeAction = createAction(
  RollDiceActionTypes.setRollAgainType,
  (rollAgainType: DiceRollAgainType) => rollAgainType,
)();

export const setExceptionalSuccessAtAction = createAction(
  RollDiceActionTypes.setExceptionalSuccessAt,
  (at: number) => at,
)();

export const setRollAsChanceDice = createAction(
  RollDiceActionTypes.setRollAsChanceDice,
  (rollAsChanceDice: boolean) => rollAsChanceDice,
)();

export const setRoteQualityAction = createAction(
  RollDiceActionTypes.setRoteQuality,
  (roteQuality: boolean) => roteQuality,
)();

export const rollDiceAction = createAction(
  RollDiceActionTypes.rollDice,
  (config: DiceRollConfig, context: DiceRollContext) => {
    return {config, context};
  },
)();

export const didRollDiceAction = createAction(
  RollDiceActionTypes.didRollDice,
  (roll: DiceRoll, context: DiceRollContext) => {
    return {roll, context};
  },
)();

export type DidRollDiceAction = PayloadAction<
  RollDiceActionTypes.didRollDice,
  {roll: DiceRoll; context: DiceRollContext}
>;

export const clearCurrentRollAction = createAction(
  RollDiceActionTypes.clearCurrentRoll,
  () => {},
)();

export const setCurrentRollAction = createAction(
  RollDiceActionTypes.setCurrentRoll,
  (roll: DiceRoll, context: DiceRollContext) => {
    return {roll, context};
  },
)();

export const deleteRollAction = createAction(
  RollDiceActionTypes.deleteDiceRoll,
  (id: string, context: DiceRollContext) => {
    return {id, context};
  },
)();

const actions = {
  setNumberOfDiceAction,
  setRollAgainTypeAction,
  setExceptionalSuccessAtAction,
  rollDiceAction,
  didRollDiceAction,
  clearCurrentRollAction,
  setCurrentRollAction,
  deleteRollAction,
  setRollAsChanceDice,
  setRoteQuality: setRoteQualityAction,
};

export type RollDiceActions = ActionType<typeof actions>;

export const rollDiceReducer = produce(
  (draft: RollDiceState, action: RollDiceActions): void => {
    switch (action.type) {
      case RollDiceActionTypes.didRollDice:
        break;
      case RollDiceActionTypes.rollDice:
        if (action.payload.context === DiceRollContext.rollDice) {
          draft.currentRollId = action.payload.config.id;
        }
        break;
      case RollDiceActionTypes.setExceptionalSuccessAt:
        draft.exceptionalSuccessAt = action.payload;
        break;
      case RollDiceActionTypes.setNumberOfDice:
        draft.numberOfDice = action.payload;
        break;
      case RollDiceActionTypes.setRollAgainType:
        draft.rollAgainType = action.payload;
        break;
      case RollDiceActionTypes.setRollAsChanceDice:
        draft.rollOneDiceAsChanceDice = action.payload;
        break;
      case RollDiceActionTypes.setRoteQuality:
        draft.roteQuality = action.payload;
        break;
      case RollDiceActionTypes.clearCurrentRoll:
        draft.currentRollId = null;
        break;
      case RollDiceActionTypes.setCurrentRoll:
        const roll = action.payload.roll;
        const config = roll.configuration;
        draft.currentRollId = roll.id;
        draft.exceptionalSuccessAt =
          config.successesNeededForExceptionalSuccess;

        let numberOfDices = 0;
        for (let key in config.modifiers) {
          numberOfDices += config.modifiers[key];
        }
        draft.numberOfDice = numberOfDices;

        if (isEqual(config.explodeFor, [8, 9, 10])) {
          draft.rollAgainType = DiceRollAgainType.eightAgain;
        } else if (isEqual(config.explodeFor, [9, 10])) {
          draft.rollAgainType = DiceRollAgainType.nineAgain;
        } else if (isEqual(config.explodeFor, [10])) {
          draft.rollAgainType = DiceRollAgainType.tenAgain;
        } else if (isEqual(config.explodeFor, [])) {
          draft.rollAgainType = DiceRollAgainType.none;
        }

        if (isEqual(config.explodeOnceFor, [1, 2, 3, 4, 5, 6, 7])) {
          draft.roteQuality = true;
        } else {
          draft.roteQuality = false;
        }

        if (
          isEqual(config.explodeFor, []) &&
          isEqual(config.explodeOnceFor, []) &&
          config.difficulty === 10
        ) {
          draft.rollOneDiceAsChanceDice = true;
          draft.rollAgainType = DiceRollAgainType.none;
          draft.roteQuality = false;
        }
    }
  },
);
