import {PayloadedAction} from '../../redux/PayloadedAction';
import {combineReducers} from 'redux';
import {DiceRollAgainType} from '../../rules/dice-roll/DiceRollAgainType';
import {DiceRollConfig} from '../../rules/dice-roll/DiceRoll.config';
import {DiceRollContext} from '../../rules/DiceRollContext';
import {DiceRoll} from '../../rules/dice-roll/DiceRoll';

export interface RollDiceState {
  numberOfDices: number;
  rollAgainType: DiceRollAgainType;
  exceptionalSuccessAt: number;
  currentRollId: string | null;
}

export enum RollDiceActionTypes {
  setNumberOfDices = 'rollDice/setNumberOfDices',
  setRollAgainType = 'rollDice/setRollAgainType',
  setExceptionalSuccessAt = 'rollDice/setExceptionalSuccessAt',
  rollDices = 'rollDice/rollDice',
  didRollDices = 'rollDice/didRollDices',
}

export interface SetNumberOfDicesAction
  extends PayloadedAction<RollDiceActionTypes.setNumberOfDices, number> {}

export function setNumberOfDicesAction(dices: number): SetNumberOfDicesAction {
  return {
    type: RollDiceActionTypes.setNumberOfDices,
    payload: dices,
  };
}

const numberOfDices = (
  state: number | undefined,
  action: RollDiceActions,
): number => {
  if (state === undefined) {
    return 3;
  }

  switch (action.type) {
    case RollDiceActionTypes.setNumberOfDices:
      return action.payload;
    default:
      return state;
  }
};

export interface SetRollAgainTypeAction
  extends PayloadedAction<
    RollDiceActionTypes.setRollAgainType,
    DiceRollAgainType
  > {}

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

export interface SetExceptionalSuccessAtAction
  extends PayloadedAction<
    RollDiceActionTypes.setExceptionalSuccessAt,
    number
  > {}

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

export interface RollDiceAction
  extends PayloadedAction<
    RollDiceActionTypes.rollDices,
    {config: DiceRollConfig; context: DiceRollContext}
  > {}

export function rollDiceAction(
  config: DiceRollConfig,
  context: DiceRollContext,
): RollDiceAction {
  return {
    type: RollDiceActionTypes.rollDices,
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
    case RollDiceActionTypes.rollDices:
      if (action.payload.context === DiceRollContext.rollDice) {
        return action.payload.config.id;
      }
      return state;
    default:
      return state;
  }
};

export interface DidRollDicesAction
  extends PayloadedAction<RollDiceActionTypes.didRollDices, DiceRoll> {}
export function didRollDicesAction(roll: DiceRoll): DidRollDicesAction {
  return {
    type: RollDiceActionTypes.didRollDices,
    payload: roll,
  };
}

export type RollDiceActions =
  | SetNumberOfDicesAction
  | SetRollAgainTypeAction
  | SetExceptionalSuccessAtAction
  | RollDiceAction
  | DidRollDicesAction;

export const rollDiceReducer = combineReducers<RollDiceState>({
  numberOfDices,
  rollAgainType,
  exceptionalSuccessAt,
  currentRollId,
});
