import LocalizedStrings from 'react-native-localization';
import {SpellFactorType} from './SpellFactor.type';

export interface SpellFactorStrings {
  castingTime: string;
  duration: string;
  potency: string;
  range: string;
  scale: string;
}

export function spellFactorName(type: SpellFactorType) {
  switch (type) {
    case SpellFactorType.castingTime:
      return spellFactoreLocalization.castingTime;
    case SpellFactorType.duration:
      return spellFactoreLocalization.duration;
    case SpellFactorType.potency:
      return spellFactoreLocalization.potency;
    case SpellFactorType.range:
      return spellFactoreLocalization.range;
    case SpellFactorType.scale:
      return spellFactoreLocalization.scale;
  }
}

export const spellFactoreLocalization = new LocalizedStrings<
  SpellFactorStrings
>({
  en: {
    castingTime: 'Casting Time:',
    duration: 'Duration:',
    potency: 'Potency',
    range: 'Range',
    scale: 'Scale',
  },
});
