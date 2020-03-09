import {DiceRollAgainType} from '../../rules/dice-roll/DiceRollAgainType';
import {Theme} from 'react-native-paper';
import {DiceRoll} from '../../rules/dice-roll/DiceRoll';

export type RollDiceProps = {
  navigation: any;
  currentRoll?: DiceRoll;
  numberOfDice: number;
  rollAgainType: DiceRollAgainType;
  exceptionalSuccessAt: number;
  rollOneDiceAsChanceDice: boolean;
  roteQuality: boolean;
  theme: Theme;
  setNumberOfDice: (dice: number) => void;
  setRollAgainType: (type: DiceRollAgainType) => void;
  setExceptionalSuccessAt: (at: number) => void;
  setRollOneDiceAsChanceDice: (rollAsChanceDice: boolean) => void;
  setRoteQuality: (roteQuality: boolean) => void;
  rollDice: () => void;
  clearCurrentRoll: (roll: DiceRoll) => void;
};
