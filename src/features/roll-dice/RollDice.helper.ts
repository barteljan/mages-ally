import uuid from 'uuid';
import {
  DiceRollConfig,
  makeRollConfig,
  make9AgainRollConfig,
  make8AgainRollConfig,
  makeRoteQualityRollConfig,
} from '../../rules/dice-roll/DiceRoll.config';
import {DiceRollAgainType} from '../../rules/dice-roll/DiceRollAgainType';

export const makeDiceRollConfigForDiceRollContainer = (
  numberOfDices: number,
  rollAgainType: DiceRollAgainType,
  exceptionalSuccessAt: number,
): DiceRollConfig => {
  let title =
    'Rolled ' + numberOfDices + (numberOfDices === 1 ? ' dice' : ' dices');

  let id = uuid.v4();

  switch (rollAgainType) {
    case DiceRollAgainType.tenAgain:
      return makeRollConfig(
        title,
        {rolled: numberOfDices},
        id,
        exceptionalSuccessAt,
      );
    case DiceRollAgainType.nineAgain:
      return make9AgainRollConfig(
        title,
        {rolled: numberOfDices},
        id,
        exceptionalSuccessAt,
      );
    case DiceRollAgainType.eightAgain:
      return make8AgainRollConfig(
        title,
        {rolled: numberOfDices},
        id,
        exceptionalSuccessAt,
      );
    case DiceRollAgainType.roteQuality:
      return makeRoteQualityRollConfig(
        title,
        {rolled: numberOfDices},
        id,
        exceptionalSuccessAt,
      );
  }
};
