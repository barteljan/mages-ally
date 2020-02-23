import LocalizedStrings from 'react-native-localization';
import {ArcanaType} from './arcana/Arcana.type';
import {localization as arkanumLocalization} from './arcana/Arcana.strings';
import {SpellType} from './Spell.type';

export type SpellConfigStrings = {
  caster_arkanum_summary_highest_arcanum: string;
  caster_arkanum_summary_ruling_arcanum: string;
  caster_arkanum_summary_highest_ruling_arcanum: string;
  [SpellType.improvised]: string;
  [SpellType.praxis]: string;
  [SpellType.rote]: string;
  spell_summary: string;
};

export enum VariablePlaceholder {
  highestArcanum = '{{highestArcanum}}',
  spellType = '{{spellType}}',
  primaryFactor = '{{primaryFactor}}',
  value = '{{value}}',
}

export const localization = new LocalizedStrings<SpellConfigStrings>({
  en: {
    caster_arkanum_summary_highest_arcanum:
      VariablePlaceholder.highestArcanum + ' is the highest arcanum',
    caster_arkanum_summary_highest_ruling_arcanum:
      VariablePlaceholder.highestArcanum +
      ' is the highest and a ruling arcanum',
    caster_arkanum_summary_ruling_arcanum:
      VariablePlaceholder.highestArcanum + ' is one of the ruling arcana',
    [SpellType.improvised]: 'Improvised',
    [SpellType.praxis]: 'Praxis',
    [SpellType.rote]: 'Rote',
    spell_summary:
      VariablePlaceholder.highestArcanum +
      ' ' +
      VariablePlaceholder.value +
      ' spell (' +
      VariablePlaceholder.spellType +
      ') with primary factor ' +
      VariablePlaceholder.primaryFactor,
  },
});

export function castersArkanumSummary(
  arcanum: ArcanaType,
  isHighestArcanum: boolean,
  isRulingArcanum: boolean,
): string {
  let arcanumString = arkanumLocalization[arcanum];

  let summary = '';
  if (isHighestArcanum && isRulingArcanum) {
    summary = localization.caster_arkanum_summary_highest_ruling_arcanum;
  } else if (isHighestArcanum) {
    summary = localization.caster_arkanum_summary_highest_arcanum;
  } else if (isRulingArcanum) {
    summary = localization.caster_arkanum_summary_ruling_arcanum;
  }

  return summary.replace(VariablePlaceholder.highestArcanum, arcanumString);
}

export function spellTypeName(type: SpellType): string {
  return localization[type];
}
