import LocalizedStrings from 'react-native-localization';

export type NavigationStrings = {
  rolls_route_title: string;
  add_roll_route_title: string;
  spells_route_title: string;
  add_spell_route_title: string;
  edit_spell_route_title: string;
  roll_spell_route_title: string;
  choose_yantras_route_title: string;
};

export const localization = new LocalizedStrings<NavigationStrings>({
  en: {
    rolls_route_title: 'Dice Rolls',
    add_roll_route_title: 'Roll Dice',
    spells_route_title: 'Spells',
    add_spell_route_title: 'Add spell',
    edit_spell_route_title: 'Edit spell',
    choose_yantras_route_title: 'Choose a yantra!',
    roll_spell_route_title: 'Roll Dice',
  },
});
