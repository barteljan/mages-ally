import {DiceRollAgainType} from '../../rules/dice-roll/DiceRollAgainType';
import {Theme} from 'react-native-paper';
import {DiceRoll} from '../../rules/dice-roll/DiceRoll';

export type RollDiceProps = {
  currentRoll?: DiceRoll;
  numberOfDice: number;
  rollAgainType: DiceRollAgainType;
  exceptionalSuccessAt: number;
  theme: Theme;
  setNumberOfDice: (dice: number) => void;
  setRollAgainType: (type: DiceRollAgainType) => void;
  setExceptionalSuccessAt: (at: number) => void;
  rollDice: () => void;
  clearCurrentRoll: (roll: DiceRoll) => void;
};
