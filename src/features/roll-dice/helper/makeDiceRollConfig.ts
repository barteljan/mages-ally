import uuid from 'uuid';
import {
  DiceRollConfig,
  makeRollConfig,
  make9AgainRollConfig,
  make8AgainRollConfig,
  makeRoteQualityRollConfig,
} from '../../../rules/dice-roll/DiceRoll.config';
import {DiceRollAgainType} from '../../../rules/dice-roll/DiceRollAgainType';
import {localization, LocalizationParams} from '../RollDice.strings';

export const makeDiceRollConfig = (
  numberOfDices: number,
  rollAgainType: DiceRollAgainType,
  exceptionalSuccessAt: number,
): DiceRollConfig => {
  const dicesString: string =
    numberOfDices === 1
      ? localization.message_dice_singular
      : localization.message_dice_plural;

  let title = localization.dice_roll_title
    .replace(LocalizationParams.dicesNumber, numberOfDices + '')
    .replace(LocalizationParams.dicesString, dicesString);

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
