import LocalizedStrings from 'react-native-localization';
import {SpellFactorType} from './SpellFactor.type';
import {SpellFactorLevel} from './SpellFactor.level';

export type SpellFactorStrings = {
  [SpellFactorType.castingTime]: string;
  [SpellFactorType.duration]: string;
  [SpellFactorType.potency]: string;
  [SpellFactorType.range]: string;
  [SpellFactorType.scale]: string;
  [SpellFactorLevel.standard]: string;
  [SpellFactorLevel.advanced]: string;
};

export function spellFactorName(type: SpellFactorType) {
  return spellFactorLocalization[type];
}

export function spellFactorLevelName(level: SpellFactorLevel): string {
  return spellFactorLocalization[level];
}

export const spellFactorLocalization = new LocalizedStrings<SpellFactorStrings>(
  {
    en: {
      [SpellFactorType.castingTime]: 'Casting Time',
      [SpellFactorType.duration]: 'Duration',
      [SpellFactorType.potency]: 'Potency',
      [SpellFactorType.range]: 'Range',
      [SpellFactorType.scale]: 'Scale',
      [SpellFactorLevel.standard]: 'Standard',
      [SpellFactorLevel.advanced]: 'Advanced',
    },
  },
);
