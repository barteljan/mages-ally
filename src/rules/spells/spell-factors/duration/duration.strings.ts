import LocalizedStrings from 'react-native-localization';
import {SpellFactorLevel} from '../SpellFactor.level';

export type SpellFactorDurationStrings = {
  standard1: string;
  standard2: string;
  standard3: string;
  standard4: string;
  standard5: string;
  advanced1: string;
  advanced2: string;
  advanced3: string;
  advanced4: string;
  advanced5: string;
  advanced6: string;
};

export function spellFactorLabelDuration(
  level: SpellFactorLevel,
  value: number,
): string {
  switch (level) {
    case SpellFactorLevel.standard:
      switch (value) {
        case 0:
          return durationLocalization.standard1;
        case 1:
          return durationLocalization.standard2;
        case 2:
          return durationLocalization.standard3;
        case 3:
          return durationLocalization.standard4;
        case 4:
          return durationLocalization.standard5;
        default:
          return '';
      }
    case SpellFactorLevel.advanced:
      switch (value) {
        case 0:
          return durationLocalization.advanced1;
        case 1:
          return durationLocalization.advanced2;
        case 2:
          return durationLocalization.advanced3;
        case 3:
          return durationLocalization.advanced4;
        case 4:
          return durationLocalization.advanced5;
        case 5:
          return durationLocalization.advanced6;
        default:
          return '';
      }
  }
}

export const durationLocalization = new LocalizedStrings<
  SpellFactorDurationStrings
>({
  en: {
    standard1: '1 turn',
    standard2: '2 turns',
    standard3: '3 turns',
    standard4: '5 turns',
    standard5: '10 turns',
    advanced1: '1 scene/hour',
    advanced2: '1 day',
    advanced3: '1 week',
    advanced4: '1 month',
    advanced5: '1 year',
    advanced6: 'Indefinite (requires A Reach and a Mana)',
  },
});
