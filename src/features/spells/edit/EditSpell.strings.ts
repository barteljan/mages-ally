import LocalizedStrings from 'react-native-localization';

export type EditDiceStrings = {
  spell_title: string;
  gnosis_title: string;
  caster_section_title: string;
  highest_arcanum_title: string;
  highest_arcanum_value: string;
  is_arcanum_the_highest_acranum: string;
  is_ruling_arcanum: string;
  number_of_active_spells: string;
  number_of_active_spells_singular: string;
  number_of_active_spells_plural: string;
  number_of_additional_dice_title: string;
  dice: string;
  spends_willpower_title: string;
  spends_willpower_description: string;
  spell_section_title: string;
  required_arcanum_value_title: string;
  primary_factor_title: string;
  spell_type_title: string;
  rote_skill_title: string;
};

export enum VariablePlaceholder {
  highestArcanum = '{{highestArcanum}}',
}

export const localization = new LocalizedStrings<EditDiceStrings>({
  en: {
    spell_title: 'Title',
    gnosis_title: 'Gnosis',
    caster_section_title: 'Caster',
    highest_arcanum_title: 'Highest Arcanum Used in the Spell',
    highest_arcanum_value:
      "Mage's " + VariablePlaceholder.highestArcanum + ' arcanum',
    is_arcanum_the_highest_acranum:
      'Is ' + VariablePlaceholder.highestArcanum + ' your Highest Arcanum?',
    is_ruling_arcanum:
      'Is ' + VariablePlaceholder.highestArcanum + ' a Ruling Arcana?',
    number_of_active_spells: 'Active Spells',
    number_of_active_spells_singular: 'active spell',
    number_of_active_spells_plural: 'active spells',
    number_of_additional_dice_title: 'Additional Spellcasting Dice',
    dice: 'dice',
    spends_willpower_title: 'Spend Willpower',
    spends_willpower_description: 'caster spends willpower',
    spell_section_title: 'Spell',
    required_arcanum_value_title:
      VariablePlaceholder.highestArcanum + ' should be at least',
    primary_factor_title: 'Primary factor',
    spell_type_title: 'Type',
    rote_skill_title: 'Rote Skill',
  },
});

export function activeSpellsSummary(numberOfActiveSpells: number): string {
  if (numberOfActiveSpells !== 1) {
    return (
      numberOfActiveSpells + ' ' + localization.number_of_active_spells_plural
    );
  } else {
    return (
      numberOfActiveSpells + ' ' + localization.number_of_active_spells_singular
    );
  }
}
