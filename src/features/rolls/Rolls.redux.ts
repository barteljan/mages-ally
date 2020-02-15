import StringMap from '../../data-types/StringMap';
import {DiceRoll} from '../../rules/dice-roll/DiceRoll';
import {
  DidRollDiceAction,
  RollDiceActionTypes,
} from '../roll-dice/RollDice.redux';
import {combineReducers, AnyAction} from 'redux';

export type RollsState = {
  diceRolls: StringMap<DiceRoll>;
  list: RollsEntry[];
};

export type RollsEntry = {
  id: string;
  createdAt: number;
};

export type RollsActions = DidRollDiceAction;

const diceRolls = (
  state: StringMap<DiceRoll> | undefined,
  action: AnyAction,
): RollsState['diceRolls'] => {
  if (state === undefined) {
    return {};
  }

  switch (action.type) {
    case RollDiceActionTypes.didRollDice:
      if (action.payload && !state[action.payload.id]) {
        return {...state, [action.payload.id]: action.payload};
      }
      return state;
    default:
      return state;
  }
};

const list = (
  state: RollsState['list'] | undefined,
  action: AnyAction,
): RollsEntry[] => {
  if (state === undefined) {
    return [];
  }

  switch (action.type) {
    case RollDiceActionTypes.didRollDice:
      if (
        !state[0] ||
        state[0].id !== action.payload.id ||
        state[0].createdAt !== action.payload.createdAt
      ) {
        return [
          {id: action.payload.id, createdAt: action.payload.createdAt},
          ...state,
        ];
      }
      return state;

    default:
      return state;
  }
};

export const rollsReducer = combineReducers<RollsState, AnyAction>({
  diceRolls,
  list,
});
