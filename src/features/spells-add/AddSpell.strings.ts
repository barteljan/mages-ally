import LocalizedStrings from 'react-native-localization';

export type RollDiceStrings = {
  spell_title: string;
  gnosis_title: string;
  highest_arcanum_title: string;
};

export const localization = new LocalizedStrings<RollDiceStrings>({
  en: {
    spell_title: 'Title',
    gnosis_title: 'Gnosis',
    highest_arcanum_title: 'Highest Arcanum Used in the Spell',
  },
});
