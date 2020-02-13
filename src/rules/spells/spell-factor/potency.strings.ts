import LocalizedStrings from 'react-native-localization';
import {SpellFactorLevel} from './SpellFactor.level';

export interface SpellFactorPotencyStrings {
  dice: string;
}

export function spellFactorLabelPotency(
  level: SpellFactorLevel,
  value: number,
) {
  return value + 1 + '';
}

export const potencyLocalization = new LocalizedStrings<
  SpellFactorPotencyStrings
>({
  en: {
    dice: 'dice',
  },
});
