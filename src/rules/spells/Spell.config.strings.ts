import LocalizedStrings from 'react-native-localization';
import {ArcanaType} from './arcana/Arcana.type';
import {localization as arkanumLocalization} from './arcana/Arcana.strings';

export type SpellConfigStrings = {
  caster_arkanum_summary_highest_arcanum: string;
  caster_arkanum_summary_ruling_arcanum: string;
  caster_arkanum_summary_highest_ruling_arcanum: string;
};

export enum VariablePlaceholder {
  highestArcanum = '{{highestArcanum}}',
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
