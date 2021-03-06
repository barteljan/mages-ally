import uuid from 'uuid';
import {
  DiceRollConfig,
  makeRollConfig,
  make9AgainRollConfig,
  make8AgainRollConfig,
  makeNoRollAgainRollConfig,
  makeChanceDiceConfig,
} from '../../../rules/dice-roll/DiceRoll.config';
import {DiceRollAgainType} from '../../../rules/dice-roll/DiceRollAgainType';
import {localization, LocalizationParams} from '../RollDice.strings';

export const makeDiceRollConfig = (
  numberOfDice: number,
  rollAgainType: DiceRollAgainType,
  exceptionalSuccessAt: number,
  rollOneDiceAsChanceDice: boolean,
  roteQuality: boolean,
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

  if (rollOneDiceAsChanceDice && numberOfDice === 1) {
    return makeChanceDiceConfig(
      title + ' (' + localization.chance_dice + ')',
      id,
    );
  }

  switch (rollAgainType) {
    case DiceRollAgainType.tenAgain:
      return makeRollConfig(
        title,
        {rolled: numberOfDice},
        roteQuality,
        id,
        exceptionalSuccessAt,
      );
    case DiceRollAgainType.nineAgain:
      return make9AgainRollConfig(
        title,
        {rolled: numberOfDice},
        roteQuality,
        id,
        exceptionalSuccessAt,
      );
    case DiceRollAgainType.eightAgain:
      return make8AgainRollConfig(
        title,
        {rolled: numberOfDice},
        roteQuality,
        id,
        exceptionalSuccessAt,
      );
    case DiceRollAgainType.none:
      return makeNoRollAgainRollConfig(
        title,
        {rolled: numberOfDice},
        roteQuality,
        id,
        exceptionalSuccessAt,
      );
  }
};
