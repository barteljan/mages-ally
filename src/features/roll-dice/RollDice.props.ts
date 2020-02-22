import {DiceRollAgainType} from '../../rules/dice-roll/DiceRollAgainType';
import {Theme} from 'react-native-paper';

export type RollDiceProps = {
  numberOfDice: number;
  rollAgainType: DiceRollAgainType;
  exceptionalSuccessAt: number;
  theme: Theme;
  setNumberOfDice: (dice: number) => void;
  setRollAgainType: (type: DiceRollAgainType) => void;
  setExceptionalSuccessAt: (at: number) => void;
  rollDice: () => void;
};
