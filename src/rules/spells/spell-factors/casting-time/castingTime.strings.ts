import LocalizedStrings from 'react-native-localization';
import {RitualIntervalUnit} from '../../../gnosis/GnosisRule';

export enum CastingTimeStringKey {
  dice = 'dice',
  advancedDescription = 'advancedDescription',
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

export interface SpellFactorCastingTimeStrings {
  dice_singular: string;
  dice_plural: string;
  hour_singular: string;
  hour_plural: string;
  minute_singular: string;
  minute_plural: string;
  advancedDescription: string;
}

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
