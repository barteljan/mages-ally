import StringMap from '../../data-types/StringMap';
import {DiceRoll} from '../../rules/dice-roll/DiceRoll';
import {
  DidRollDiceAction,
  RollDiceActionTypes,
  RollDiceActions,
} from '../roll-dice/RollDice.redux';
import produce from 'immer';

export type RollsState = {
  diceRolls: StringMap<DiceRoll>;
  list: RollsEntry[];
};

export type RollsEntry = {
  id: string;
  createdAt: number;
};

export type RollsActions = DidRollDiceAction;

export const rollsReducer = produce(
  (draft: RollsState, action: RollDiceActions) => {
    switch (action.type) {
      case RollDiceActionTypes.didRollDice:
        draft.diceRolls[action.payload.id] = action.payload;
        draft.list.unshift({
          id: action.payload.id,
          createdAt: action.payload.createdAt,
        });
        break;
    }
  },
);
