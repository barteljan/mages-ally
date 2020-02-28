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
  spell_factor_section_title: string;
  yantra_section_title: string;
  yantra_add_button_title: string;
  paradox_section_title: string;
  inured_spell_title: string;
  mage_is_inured_to_spell: string;
  previous_paradox_rolls_title: string;
  previous_paradox_rolls_singular: string;
  previous_paradox_rolls_plural: string;
  additional_mana_spend_title: string;
  additional_mana_spend_singular: string;
  additional_mana_spend_plural: string;
  witnesses_title: string;
  warning_enter_title_for_this_spell: string;
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
    spell_factor_section_title: 'Spell Factors',
    yantra_section_title: 'Yantras',
    yantra_add_button_title: 'Add Yantra',
    paradox_section_title: 'Paradox',
    inured_spell_title: "Is the Mage's Inured to this Spell? (+2 dice)",
    mage_is_inured_to_spell: 'Mage is inured to this spell',
    previous_paradox_rolls_title:
      'Previous Paradox Rolls in this Scene (+1 dice per roll)',
    previous_paradox_rolls_singular: 'previous roll',
    previous_paradox_rolls_plural: 'previous rolls',
    additional_mana_spend_title: 'Additional Mana spent to reduce paradox',
    additional_mana_spend_singular: 'Point',
    additional_mana_spend_plural: 'Points',
    witnesses_title: 'Sleeper witnesses recognizing your spell',
    warning_enter_title_for_this_spell: 'Please enter a title for this spell',
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
