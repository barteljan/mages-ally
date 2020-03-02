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
};

export enum RollDiceActionTypes {
  setNumberOfDice = 'rollDice/setNumberOfDice',
  setRollAgainType = 'rollDice/setRollAgainType',
  setExceptionalSuccessAt = 'rollDice/setExceptionalSuccessAt',
  rollDice = 'rollDice/rollDice',
  didRollDice = 'rollDice/didRollDice',
  clearCurrentRoll = 'rollDice/clearCurrentRoll',
  setCurrentRoll = 'rollDice/setCurrentRoll',
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

export const rollDiceAction = createAction(
  RollDiceActionTypes.rollDice,
  (config: DiceRollConfig, context: DiceRollContext) => {
    return {config, context};
  },
)();

export const didRollDiceAction = createAction(
  RollDiceActionTypes.didRollDice,
  (roll: DiceRoll) => roll,
)();

export const clearCurrentRoll = createAction(
  RollDiceActionTypes.clearCurrentRoll,
  (roll: DiceRoll) => roll,
)();

export const setCurrentRoll = createAction(
  RollDiceActionTypes.setCurrentRoll,
  (roll: DiceRoll, context: DiceRollContext) => {
    return {roll, context};
  },
)();

export type DidRollDiceAction = PayloadAction<
  RollDiceActionTypes.didRollDice,
  DiceRoll
>;

const actions = {
  setNumberOfDiceAction,
  setRollAgainTypeAction,
  setExceptionalSuccessAtAction,
  rollDiceAction,
  didRollDiceAction,
  clearCurrentRoll,
  setCurrentRoll,
};
import {isEqual} from 'lodash';

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
        } else if (isEqual(config.explodeOnceFor, [1, 2, 3, 4, 5, 6, 7])) {
          draft.rollAgainType = DiceRollAgainType.roteQuality;
        }
    }
  },
);
