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
};

export type RollDiceActions = ActionType<typeof actions>;

export const rollDiceReducer = produce(
  (draft: RollDiceState, action: RollDiceActions): RollDiceState | void => {
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
    }
  },
);
