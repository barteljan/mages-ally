import LocalizedStrings from 'react-native-localization';

export type EditDiceStrings = {
  spell_title: string;
  gnosis_title: string;
  highest_arcanum_title: string;
  highest_arcanum_value: string;
  is_arcanum_the_highest_acranum: string;
};

export enum VariablePlaceholder {
  highestArcanum = '{{highestArcanum}}',
}

export const localization = new LocalizedStrings<EditDiceStrings>({
  en: {
    spell_title: 'Title',
    gnosis_title: 'Gnosis',
    highest_arcanum_title: 'Highest Arcanum Used in the Spell',
    highest_arcanum_value:
      "Mage's " + VariablePlaceholder.highestArcanum + ' arcanum',
    is_arcanum_the_highest_acranum:
      'Is ' +
      VariablePlaceholder.highestArcanum +
      " the Mage's Highest Arcanum?",
  },
});
