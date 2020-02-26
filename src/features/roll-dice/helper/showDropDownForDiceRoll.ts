import {DiceRoll} from '../../../rules/dice-roll/DiceRoll';
import {DiceRollOutcome} from '../../../rules/dice-roll/DiceRoll.outcome';
import {showMessage} from 'react-native-flash-message';
import {localization, LocalizationParams} from '../RollDice.strings';
import {theme} from '../../../layout/Theme';

export function showDropDownForDiceRoll(roll: DiceRoll) {
  const diceString: string =
    roll.rolledDice.length === 1
      ? localization.message_dice_singular
      : localization.message_dice_plural;
  switch (roll.outcome) {
    case DiceRollOutcome.success:
      showMessage({
        message: localization.message_success,
        description: localization.message_success_description
          .replace(LocalizationParams.diceNumber, roll.rolledDice.length + '')
          .replace(LocalizationParams.diceString, diceString)
          .replace(LocalizationParams.successes, roll.successes + ''),
        type: 'success',
        backgroundColor: theme.colors.primary,
      });
      break;
    case DiceRollOutcome.exceptionalSuccess:
      showMessage({
        message: localization.message_exceptional_success,
        description: localization.message_success_description
          .replace(LocalizationParams.diceNumber, roll.rolledDice.length + '')
          .replace(LocalizationParams.diceString, diceString)
          .replace(LocalizationParams.successes, roll.successes + ''),
        type: 'success',
        backgroundColor: theme.colors.primary,
      });
      break;
    case DiceRollOutcome.failure:
      showMessage({
        message: localization.message_failure,
        description: localization.message_failure_description
          .replace(LocalizationParams.diceNumber, roll.rolledDice.length + '')
          .replace(LocalizationParams.diceString, diceString),
        type: 'danger',
        backgroundColor: theme.colors.error,
      });
      break;
    case DiceRollOutcome.dramaticFailure:
      showMessage({
        message: localization.message_dramatic_failure,
        description: localization.message_failure_description
          .replace(LocalizationParams.diceNumber, roll.rolledDice.length + '')
          .replace(LocalizationParams.diceString, diceString),
        type: 'danger',
        backgroundColor: theme.colors.error,
      });
      break;
  }
}
