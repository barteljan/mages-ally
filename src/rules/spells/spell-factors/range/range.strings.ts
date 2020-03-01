import LocalizedStrings from 'react-native-localization';
import {SpellFactorLevel} from '../SpellFactor.level';

export type SpellFactorRangeStrings = {
  standard: string;
  advanced: string;
  dicesModifier: string;
};

export function spellFactorLabelRange(
  level: SpellFactorLevel,
  addDices: boolean,
) {
  let description = '';

  switch (level) {
    case SpellFactorLevel.standard:
      description += castingTimeLocalization.standard;
      break;
    case SpellFactorLevel.advanced:
      description += castingTimeLocalization.advanced;
      break;
  }

  if (addDices) {
    description += ' ' + castingTimeLocalization.dicesModifier;
  }

  return description;
}

export const castingTimeLocalization = new LocalizedStrings<
  SpellFactorRangeStrings
>({
  en: {
    standard: 'Self/touch or Aimed',
    advanced: 'Sensory',
    dicesModifier: '(-0 dice)',
  },
});
