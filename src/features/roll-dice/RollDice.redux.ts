import {PayloadedAction} from '../../redux/PayloadedAction';
import {combineReducers} from 'redux';
import {DiceRollAgainType} from '../../rules/dice-roll/DiceRollAgainType';
import {DiceRollConfig} from '../../rules/dice-roll/DiceRoll.config';
import {DiceRollContext} from '../../rules/DiceRollContext';
import {DiceRoll} from '../../rules/dice-roll/DiceRoll';

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

export type SetNumberOfDiceAction = PayloadedAction<
  RollDiceActionTypes.setNumberOfDice,
  number
>;

export function setNumberOfDiceAction(dice: number): SetNumberOfDiceAction {
  return {
    type: RollDiceActionTypes.setNumberOfDice,
    payload: dice,
  };
}

const numberOfDice = (
  state: number | undefined,
  action: RollDiceActions,
): number => {
  if (state === undefined) {
    return 3;
  }

  switch (action.type) {
    case RollDiceActionTypes.setNumberOfDice:
      return action.payload;
    default:
      return state;
  }
};

export type SetRollAgainTypeAction = PayloadedAction<
  RollDiceActionTypes.setRollAgainType,
  DiceRollAgainType
>;

export function setRollAgainTypeAction(
  rollAgainType: DiceRollAgainType,
): SetRollAgainTypeAction {
  return {
    type: RollDiceActionTypes.setRollAgainType,
    payload: rollAgainType,
  };
}

const rollAgainType = (
  state: DiceRollAgainType | undefined,
  action: RollDiceActions,
): DiceRollAgainType => {
  if (state === undefined) {
    return DiceRollAgainType.tenAgain;
  }

  switch (action.type) {
    case RollDiceActionTypes.setRollAgainType:
      return action.payload;
    default:
      return state;
  }
};

export type SetExceptionalSuccessAtAction = PayloadedAction<
  RollDiceActionTypes.setExceptionalSuccessAt,
  number
>;

export function setExceptionalSuccessAtAction(
  at: number,
): SetExceptionalSuccessAtAction {
  return {
    type: RollDiceActionTypes.setExceptionalSuccessAt,
    payload: at,
  };
}

const exceptionalSuccessAt = (
  state: number | undefined,
  action: RollDiceActions,
): number => {
  if (state === undefined) {
    return 5;
  }

  switch (action.type) {
    case RollDiceActionTypes.setExceptionalSuccessAt:
      return action.payload;
    default:
      return state;
  }
};

export type RollDiceAction = PayloadedAction<
  RollDiceActionTypes.rollDice,
  {config: DiceRollConfig; context: DiceRollContext}
>;

export function rollDiceAction(
  config: DiceRollConfig,
  context: DiceRollContext,
): RollDiceAction {
  return {
    type: RollDiceActionTypes.rollDice,
    payload: {config, context},
  };
}

const currentRollId = (
  state: string | undefined | null,
  action: RollDiceActions,
): string | null => {
  if (state === undefined) {
    return null;
  }

  switch (action.type) {
    case RollDiceActionTypes.rollDice:
      if (action.payload.context === DiceRollContext.rollDice) {
        return action.payload.config.id;
      }
      return state;
    default:
      return state;
  }
};

export type DidRollDiceAction = PayloadedAction<
  RollDiceActionTypes.didRollDice,
  DiceRoll
>;

export function didRollDiceAction(roll: DiceRoll): DidRollDiceAction {
  return {
    type: RollDiceActionTypes.didRollDice,
    payload: roll,
  };
}

export type RollDiceActions =
  | SetNumberOfDiceAction
  | SetRollAgainTypeAction
  | SetExceptionalSuccessAtAction
  | RollDiceAction
  | DidRollDiceAction;

export const rollDiceReducer = combineReducers<RollDiceState>({
  numberOfDice: numberOfDice,
  rollAgainType,
  exceptionalSuccessAt,
  currentRollId,
});
