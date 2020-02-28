import {localization as arkanaLocalization} from './arcana/Arcana.strings';
import {spellTypeName} from './Spell.config.strings';
import {SpellCastingConfig} from './Spell.config';
import {spellFactorName} from './spell-factors/SpellFactor.strings';
import {localization, VariablePlaceholder} from './Spell.config.strings';

export function spellSummary(config: SpellCastingConfig): string {
  const arcanum = config.caster.highestSpellArcanum.arcanumType;
  const spellValue = config.spell.requiredArcanumValue;
  const type = config.spell.type;
  const typeName = spellTypeName(type);
  const primaryFactor = config.spell.primaryFactor;
  const primaryFactorName = spellFactorName(primaryFactor);
  const chosenArkanumTitle: string = arkanaLocalization[arcanum];

  const template = localization.spell_summary;
  const summary = template
    .replace(VariablePlaceholder.highestArcanum, chosenArkanumTitle)
    .replace(VariablePlaceholder.spellType, typeName)
    .replace(
      VariablePlaceholder.primaryFactor,
      primaryFactorName.toLocaleLowerCase(),
    )
    .replace(VariablePlaceholder.value, spellValue + '');
  return summary;
}

export function spellShortSummary(config: SpellCastingConfig): string {
  const arcanum = config.caster.highestSpellArcanum.arcanumType;
  const spellValue = config.spell.requiredArcanumValue;
  const type = config.spell.type;
  const typeName = spellTypeName(type);
  const chosenArkanumTitle: string = arkanaLocalization[arcanum];

  const template = localization.short_spell_summary;
  const summary = template
    .replace(VariablePlaceholder.highestArcanum, chosenArkanumTitle)
    .replace(VariablePlaceholder.spellType, typeName)
    .replace(VariablePlaceholder.value, spellValue + '');
  return summary;
}
