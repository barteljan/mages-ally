import LocalizedStrings from 'react-native-localization';
import {SpellFactorLevel} from '../SpellFactor.level';
import {SpellFactorType} from '../SpellFactor.type';
import {DurationRules, makeDurationRules} from './duration.rules';

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
  dice: string;
};

export function spellFactorLabelDuration(
  level: SpellFactorLevel,
  value: number,
  primaryFactor: SpellFactorType,
  highestArcanumValue: number,
  addDices: boolean,
  rules: DurationRules = makeDurationRules(primaryFactor, highestArcanumValue),
): string {
  let suffix: string = ' (';
  let diceModifier: number;
  switch (level) {
    case SpellFactorLevel.standard:
      diceModifier = rules.standard[value].diceModifier;
      break;
    case SpellFactorLevel.advanced:
      diceModifier = rules.advanced[value].diceModifier;
      break;
  }
  suffix +=
    diceModifier === 0
      ? '-0 ' + durationLocalization.dice + ')'
      : diceModifier + ' ' + durationLocalization.dice + ')';

  if (!addDices) {
    suffix = '';
  }

  switch (level) {
    case SpellFactorLevel.standard:
      switch (value) {
        case 0:
          return durationLocalization.standard1 + suffix;
        case 1:
          return durationLocalization.standard2 + suffix;
        case 2:
          return durationLocalization.standard3 + suffix;
        case 3:
          return durationLocalization.standard4 + suffix;
        case 4:
          return durationLocalization.standard5 + suffix;
        default:
          return '';
      }
    case SpellFactorLevel.advanced:
      switch (value) {
        case 0:
          return durationLocalization.advanced1 + suffix;
        case 1:
          return durationLocalization.advanced2 + suffix;
        case 2:
          return durationLocalization.advanced3 + suffix;
        case 3:
          return durationLocalization.advanced4 + suffix;
        case 4:
          return durationLocalization.advanced5 + suffix;
        case 5:
          return durationLocalization.advanced6 + suffix;
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
    advanced6: 'Indefinite (requires a reach and a mana)',
    dice: 'dice',
  },
});
