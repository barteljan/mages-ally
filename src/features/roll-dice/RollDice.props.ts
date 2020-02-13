import {DiceRollAgainType} from 'src/rules/dice-roll/DiceRollAgainType';

export interface RollDiceProps {
  numberOfDice: number;
  rollAgainType: DiceRollAgainType;
  exceptionalSuccessAt: number;
  setNumberOfDice: (dice: number) => void;
  setRollAgainType: (type: DiceRollAgainType) => void;
  setExceptionalSuccessAt: (at: number) => void;
  rollDice: () => void;
}
