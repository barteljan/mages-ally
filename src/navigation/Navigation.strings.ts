import LocalizedStrings from 'react-native-localization';

export interface NavigationStrings {
  rolls_route_title: string;
  add_roll_route_title: string;
}

export const localization = new LocalizedStrings<NavigationStrings>({
  en: {
    rolls_route_title: 'Dice Rolls',
    add_roll_route_title: 'Roll Dices',
  },
});
