import {DiceRoll} from '../../dice-roll/DiceRoll';
import {WisdomRule, makeWisdomRules} from '../../wisdom/WisdomRules';
export function containParadoxRollDescription(
  roll: DiceRoll | undefined,
  paradoxRoll: DiceRoll | undefined,
  wisdomRules: WisdomRule[] = makeWisdomRules(),
): string {
  if (!roll || !paradoxRoll || !roll.configuration) {
    return 'Skipped contain paradox roll';
  }
  let numberOfDice = 0;
  for (let key in roll.configuration.modifiers) {
    numberOfDice += roll.configuration.modifiers[key];
  }
  let result = 'Contain paradox with wisdom ' + numberOfDice + '.';
  if (roll.successes >= paradoxRoll.successes) {
    result += '\n**Contained paradox** successfuly';
  } else {
    result +=
      '\n**' +
      (paradoxRoll.successes - roll.successes) +
      ' uncontained paradox reach** remaining.';
    result +=
      "\nMage get's a paradox condition for " +
      wisdomRules[numberOfDice].containParadoxConditionDuration +
      '.';
  }
  return result;
}
