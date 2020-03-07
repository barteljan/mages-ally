import {DiceRoll} from '../../dice-roll/DiceRoll';
import {WisdomRule, makeWisdomRules} from '../../wisdom/WisdomRules';
export function releaseParadoxRollDescription(
  paradoxRoll: DiceRoll,
  wisdom: number,
  wisdomRules: WisdomRule[] = makeWisdomRules(),
): string {
  if (!paradoxRoll || paradoxRoll.successes === 0) {
    return 'Released no paradox to the environment';
  } else {
    return (
      'Released ' +
      paradoxRoll.successes +
      ' paradox reach to the environment.\nA paradox anomaly will appear for ' +
      wisdomRules[wisdom].releaseParadoxConditionDuration
    );
  }
}
