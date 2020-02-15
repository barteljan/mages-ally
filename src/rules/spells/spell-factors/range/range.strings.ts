import LocalizedStrings from 'react-native-localization';
import {SpellFactorLevel} from '../SpellFactor.level';

export type SpellFactorRangeStrings = {
  standard: string;
  advanced: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function spellFactorLabelRange(level: SpellFactorLevel, value: number) {
  switch (level) {
    case SpellFactorLevel.standard:
      return castingTimeLocalization.standard;
    case SpellFactorLevel.advanced:
      return castingTimeLocalization.advanced;
  }
}

export const castingTimeLocalization = new LocalizedStrings<
  SpellFactorRangeStrings
>({
  en: {
    standard: 'Self/touch or Aimed',
    advanced: 'Sensory',
  },
});
