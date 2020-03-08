import StringMap from '../../data-types/StringMap';
import {DiceRoll} from '../../rules/dice-roll/DiceRoll';
import {
  DidRollDiceAction,
  RollDiceActionTypes,
} from '../roll-dice/RollDice.redux';
import produce from 'immer';
import {RootAction} from '../../redux/rootReducer';
import {DiceRollContext} from '../../rules/DiceRollContext';

export type RollsState = {
  diceRolls: StringMap<DiceRoll>;
  list: RollsEntry[];
};

export type RollsEntry = {
  id: string;
  createdAt: number;
};

export type RollsActions = DidRollDiceAction;

export const rollsReducer = produce((draft: RollsState, action: RootAction) => {
  switch (action.type) {
    case RollDiceActionTypes.didRollDice:
      draft.diceRolls[action.payload.roll.id] = action.payload.roll;
      switch (action.payload.context) {
        case DiceRollContext.rollDice:
          addInFrontOfDiceRollList(draft, action.payload.roll);
          break;
        case DiceRollContext.rollsList:
          addInFrontOfDiceRollList(draft, action.payload.roll);
          break;
        case DiceRollContext.spell:
          break;
      }
      break;
    case RollDiceActionTypes.deleteDiceRoll:
      delete draft.diceRolls[action.payload.id];
      draft.list = draft.list.filter(roll => roll.id !== action.payload.id);
      break;
  }
});

function addInFrontOfDiceRollList(
  draft: RollsState,
  roll: DiceRoll,
): RollsState {
  draft.list.unshift({
    id: roll.id,
    createdAt: roll.createdAt,
  });
  return draft;
}
