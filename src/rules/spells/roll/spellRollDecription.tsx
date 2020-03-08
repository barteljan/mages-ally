import {DiceRoll} from '../../dice-roll/DiceRoll';
import {DiceRollOutcome} from '../../dice-roll/DiceRoll.outcome';

export function spellRollDescription(
  roll: DiceRoll | undefined,
  spellTitle: string | undefined,
): string {
  if (!roll) {
    return 'Spell **could not be cast** (No remaining dice)';
  }
  const title = spellTitle ? spellTitle : 'spell';
  let numberOfDice = 0;
  for (let key in roll.configuration.modifiers) {
    numberOfDice += roll.configuration.modifiers[key];
  }
  let result = '';
  switch (roll.outcome) {
    case DiceRollOutcome.success:
      result +=
        'Cast ' +
        title +
        ' with ' +
        numberOfDice +
        ' dice and **' +
        roll.successes +
        ' successes.**';
      break;
    case DiceRollOutcome.exceptionalSuccess:
      result +=
        'Cast ' +
        title +
        ' with ' +
        numberOfDice +
        ' dice and ' +
        roll.successes +
        ' successes as an **exceptional success**.';
      break;
    case DiceRollOutcome.failure:
      result +=
        '**Failed to cast** ' + title + ' with ' + numberOfDice + ' dice.';
      break;
    case DiceRollOutcome.dramaticFailure:
      result +=
        '**Dramatically failed** to cast ' +
        title +
        ' with ' +
        numberOfDice +
        ' dice.';
      break;
  }
  return result;
}
