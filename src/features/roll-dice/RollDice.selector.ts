import {AppState} from 'src/redux/AppState';
import {createSelector} from 'reselect';

export const currentRollId = (state: AppState) => state.rollDice.currentRollId;
export const rolls = (state: AppState) => state.rolls.diceRolls;

export const currentRoll = createSelector(
  currentRollId,
  rolls,
  (id, rollsMap) => {
    if (id) {
      const roll = {...rollsMap[id]};
      roll.title = 'Rolled';
      return roll;
    }
    return undefined;
  },
);
