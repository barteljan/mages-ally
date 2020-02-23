import LocalizedStrings from 'react-native-localization';
import {RitualIntervalUnit, GnosisRules} from '../../../gnosis/GnosisRule';
import {SpellFactorLevel} from '../SpellFactor.level';
import {CastingTimeRules, makeCastingTimeRules} from './castingTime.rules';

export enum CastingTimeStringKey {
  dice = 'dice',
  advancedDescription = 'advancedDescription',
}

export function spellFactorLabelCastingTime(
  level: SpellFactorLevel,
  value: number,
  gnosis: number,
  gnosisRules: GnosisRules[],
  castingTimeRules: CastingTimeRules = makeCastingTimeRules(),
  translate: (
    key: RitualIntervalUnit | CastingTimeStringKey,
    plural: boolean,
  ) => string = translateCastingTimeStrings,
): string {
  let description = '';

  if (level === SpellFactorLevel.standard) {
    let rule = gnosisRules[gnosis];
    let translatedTimeUnit: string;

    let time = (value + 1) * rule.ritualInterval;

    if (time === 1) {
      translatedTimeUnit = translate(rule.ritualIntervalTimeUnit, false);
    } else {
      translatedTimeUnit = translate(rule.ritualIntervalTimeUnit, true);
    }

    const diceModifier = castingTimeRules.standard[value].diceModifier;
    let sign = '';
    if (diceModifier === 0) {
      sign = '-';
    } else if (diceModifier > 0) {
      sign = '+';
    }

    description =
      time + ' ' + translatedTimeUnit + ' (' + sign + diceModifier + ' ';
    if (value === 0) {
      description = description + translate(CastingTimeStringKey.dice, false);
    } else {
      description = description + translate(CastingTimeStringKey.dice, true);
    }
    description += ')';
  } else {
    description = translate(CastingTimeStringKey.advancedDescription, false);
  }

  return description;
}

export function translateCastingTimeStrings(
  key: RitualIntervalUnit | CastingTimeStringKey,
  plural: boolean,
): string {
  switch (key) {
    case CastingTimeStringKey.advancedDescription:
      return castingTimeLocalization.advancedDescription;
    case CastingTimeStringKey.dice:
      if (plural) {
        return castingTimeLocalization.dice_plural;
      } else {
        return castingTimeLocalization.dice_singular;
      }
    case RitualIntervalUnit.hour:
      if (plural) {
        return castingTimeLocalization.hour_plural;
      } else {
        return castingTimeLocalization.hour_singular;
      }
    case RitualIntervalUnit.minute:
      if (plural) {
        return castingTimeLocalization.minute_plural;
      } else {
        return castingTimeLocalization.minute_singular;
      }
  }
}

export type SpellFactorCastingTimeStrings = {
  dice_singular: string;
  dice_plural: string;
  hour_singular: string;
  hour_plural: string;
  minute_singular: string;
  minute_plural: string;
  advancedDescription: string;
};

export const castingTimeLocalization = new LocalizedStrings<
  SpellFactorCastingTimeStrings
>({
  en: {
    dice_singular: 'dice',
    dice_plural: 'dice',
    hour_singular: 'hour',
    hour_plural: 'hours',
    minute_plural: 'minutes',
    minute_singular: 'minute',
    advancedDescription: 'Quick casting',
  },
});
