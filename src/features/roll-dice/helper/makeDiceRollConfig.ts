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
  numberOfDice: number,
  rollAgainType: DiceRollAgainType,
  exceptionalSuccessAt: number,
  titleString?: string,
): DiceRollConfig => {
  const diceString: string =
    numberOfDice === 1
      ? localization.message_dice_singular
      : localization.message_dice_plural;

  let title = titleString
    ? titleString
    : localization.dice_roll_title
        .replace(LocalizationParams.diceNumber, numberOfDice + '')
        .replace(LocalizationParams.diceString, diceString);

  let id = uuid.v4();

  switch (rollAgainType) {
    case DiceRollAgainType.tenAgain:
      return makeRollConfig(
        title,
        {rolled: numberOfDice},
        id,
        exceptionalSuccessAt,
      );
    case DiceRollAgainType.nineAgain:
      return make9AgainRollConfig(
        title,
        {rolled: numberOfDice},
        id,
        exceptionalSuccessAt,
      );
    case DiceRollAgainType.eightAgain:
      return make8AgainRollConfig(
        title,
        {rolled: numberOfDice},
        id,
        exceptionalSuccessAt,
      );
    case DiceRollAgainType.roteQuality:
      return makeRoteQualityRollConfig(
        title,
        {rolled: numberOfDice},
        id,
        exceptionalSuccessAt,
      );
  }
};
