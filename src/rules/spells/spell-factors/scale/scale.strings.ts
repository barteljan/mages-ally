import LocalizedStrings from 'react-native-localization';
import {SpellFactorLevel} from '../SpellFactor.level';

export interface SpellFactorScaleStrings {
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
}

export function spellFactorLabelScale(level: SpellFactorLevel, value: number) {
  switch (level) {
    case SpellFactorLevel.standard:
      switch (value) {
        case 0:
          return scaleLocalization.standard1;
        case 1:
          return scaleLocalization.standard2;
        case 2:
          return scaleLocalization.standard3;
        case 3:
          return scaleLocalization.standard4;
        case 4:
          return scaleLocalization.standard5;
        default:
          return '';
      }
    case SpellFactorLevel.advanced:
      switch (value) {
        case 0:
          return scaleLocalization.advanced1;
        case 1:
          return scaleLocalization.advanced2;
        case 2:
          return scaleLocalization.advanced3;
        case 3:
          return scaleLocalization.advanced4;
        case 4:
          return scaleLocalization.advanced5;
        case 5:
          return scaleLocalization.advanced6;
        default:
          return scaleLocalization.advanced6;
      }
  }
}

export const scaleLocalization = new LocalizedStrings<SpellFactorScaleStrings>({
  en: {
    standard1: 'Arm’s reach from a central point',
    standard2: 'A small room',
    standard3: 'A large room',
    standard4: 'Several rooms, or a single floor of a house',
    standard5: 'A ballroom or small house',
    advanced1: 'A large House or building',
    advanced2: 'A small warehouse or parking lot',
    advanced3: 'A large warehouse or supermarket',
    advanced4: 'A small factory, or a shopping mall',
    advanced5: 'A large factory, or a city block',
    advanced6: 'A campus, or a small neighborhood',
  },
});
