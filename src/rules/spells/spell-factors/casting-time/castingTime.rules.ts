import {SpellFactorRules, makeSpellFactorRuleLevel} from '../SpellFactor.rules';
import {GnosisRules, RitualIntervalUnit} from '../../../gnosis/GnosisRule';
import {
  CastingTimeStringKey,
  translateCastingTimeStrings,
} from './castingTime.strings';
import {RulesType} from '../RulesType';
import {SpellFactorLevel} from '../SpellFactor.level';

type CastingTimeRules = SpellFactorRules;

export function makeCastingTimeRules(
  gnosisRules: GnosisRules[],
  gnosis: number,
  translate: (
    key: RitualIntervalUnit | CastingTimeStringKey,
    plural: boolean,
  ) => string = translateCastingTimeStrings,
): CastingTimeRules {
  let rules: SpellFactorRules = {
    standard: [],
    advanced: [
      makeSpellFactorRuleLevel(
        RulesType.castingTime,
        SpellFactorLevel.advanced,
        0,
        {
          description: translate(
            CastingTimeStringKey.advancedDescription,
            false,
          ),
        },
      ),
    ],
  };

  for (let i = 0; i < 6; i++) {
    let rule = gnosisRules[gnosis];
    let translatedTimeUnit: string;

    let time = (i + 1) * rule.ritualInterval;

    if (time === 1) {
      translatedTimeUnit = translate(rule.ritualIntervalTimeUnit, false);
    } else {
      translatedTimeUnit = translate(rule.ritualIntervalTimeUnit, true);
    }

    let description = time + ' ' + translatedTimeUnit + ' (+' + i + ' ';
    if (i === 0) {
      description += translate(CastingTimeStringKey.dice, false);
    } else {
      description += translate(CastingTimeStringKey.dice, true);
    }
    description += ')';
    const dice = i;

    rules.standard.push(
      makeSpellFactorRuleLevel(
        RulesType.castingTime,
        SpellFactorLevel.standard,
        dice,
        {description},
      ),
    );
  }

  return rules;
}
