import {SleeperWitnesses} from './SleeperWitnesses';
export type ParadoxCircumstances = {
  inuredToSpell: boolean;
  previousParadoxRolls: number;
  sleeperWitnesses: SleeperWitnesses;
  dedicatedTool: boolean;
  additionalParadoxDice: number;
  manaSpent: number;
};

export function makeParadoxCircumstances(
  paradox?: Partial<ParadoxCircumstances>,
): ParadoxCircumstances {
  return {
    inuredToSpell: false,
    additionalParadoxDice: 0,
    dedicatedTool: false,
    manaSpent: 0,
    previousParadoxRolls: 0,
    sleeperWitnesses: SleeperWitnesses.none,
    ...paradox,
  };
}
