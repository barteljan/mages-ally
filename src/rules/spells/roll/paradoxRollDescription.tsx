import {DiceRoll} from '../../dice-roll/DiceRoll';

export function paradoxRollDescription(roll: DiceRoll | undefined): string {
  if (!roll || Object.keys(roll.configuration.modifiers).length === 0) {
    return 'Rolled no paradox';
  }
  let numberOfDice = 0;
  for (let key in roll.configuration.modifiers) {
    numberOfDice += roll.configuration.modifiers[key];
  }
  let result = 'Rolled ' + numberOfDice + ' dice for paradox.';
  if (roll.successes === 0) {
    result += '\nGenerated no paradox reach.';
  } else {
    result += '\nGenerated ' + roll.successes + ' paradox reach.';
  }
  return result;
}
