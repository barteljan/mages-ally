import {DiceRollAgainType} from 'src/rules/dice-roll/DiceRollAgainType';

export interface RollDiceProps {
  numberOfDices: number;
  rollAgainType: DiceRollAgainType;
  exceptionalSuccessAt: number;
  setNumberOfDices: (dices: number) => void;
  setRollAgainType: (type: DiceRollAgainType) => void;
  setExceptionalSuccessAt: (at: number) => void;
  rollDice: () => void;
}
