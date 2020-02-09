import {AppState} from '../../redux/AppState';
import {DiceRoll} from '../../rules/dice-roll/DiceRoll';
import StringMap from '../../data-types/StringMap';
import {RollsEntry} from './Rolls.redux';
import {createSelector} from 'reselect';
export {};

export function getRoll(state: AppState, id: string): DiceRoll | null {
  const roll = state.rolls.diceRolls[id];
  if (roll) {
    return roll;
  }
  return null;
}

export const rollsMap = (state: AppState): StringMap<DiceRoll> =>
  state.rolls.diceRolls;

export const rollsEntries = (state: AppState): RollsEntry[] => state.rolls.list;

export const makeAllRollsSelector = () => {
  const allRollsSelector = createSelector(
    [rollsMap, rollsEntries],
    (map, entries) => {
      let list: DiceRoll[] = [];
      entries.forEach(entry => list.push(map[entry.id]));
      return list.filter(item => item !== null && item !== undefined);
    },
  );
  return allRollsSelector;
};
