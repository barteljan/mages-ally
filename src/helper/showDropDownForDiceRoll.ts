import {DiceRoll} from '../rules/dice-roll/DiceRoll';
import {DiceRollOutcome} from '../rules/dice-roll/DiceRoll.outcome';
import {showMessage} from 'react-native-flash-message';
import {Colors} from '../layout/Colors';

export function showDropDownForDiceRoll(roll: DiceRoll) {
  const dicesString: string = roll.rolledDices.length === 1 ? 'dice' : 'dices';
  switch (roll.outcome) {
    case DiceRollOutcome.success:
      showMessage({
        message: 'Success',
        description:
          'Rolled ' +
          roll.rolledDices.length +
          ' ' +
          dicesString +
          ' with ' +
          roll.successes +
          ' successes',
        type: 'success',
        backgroundColor: Colors.accentColor,
      });
      break;
    case DiceRollOutcome.exceptionalSuccess:
      showMessage({
        message: 'Exceptional Success!',
        description:
          ' Rolled ' +
          roll.rolledDices.length +
          ' ' +
          dicesString +
          ' with ' +
          roll.successes +
          ' successes',
        type: 'success',
        backgroundColor: Colors.accentColor,
      });
      break;
    case DiceRollOutcome.failure:
      showMessage({
        message: 'Failure',
        description:
          'Rolled ' + roll.rolledDices.length + ' dice with no successes',
        type: 'danger',
        backgroundColor: Colors.complementColor,
      });
      break;
    case DiceRollOutcome.dramaticFailure:
      showMessage({
        message: 'Dramatic Failure!',
        description:
          'Rolled ' + roll.rolledDices.length + ' dice with no successes',
        type: 'danger',
        backgroundColor: Colors.complementColor,
      });
      break;
  }
  //
}
