import LocalizedStrings from 'react-native-localization';

export interface RollDiceStrings {
  choose_dices: string;
  tenAgain_title: string;
  tenAgain: string;
  nineAgain: string;
  eightAgain: string;
  roteQuality: string;
  exceptional_sucesses_title: string;
  roll_dices_button_text: string;
}

export const localization = new LocalizedStrings<RollDiceStrings>({
  en: {
    choose_dices: 'Number of dices',
    tenAgain_title: 'Options:',
    tenAgain: '10 again',
    nineAgain: '9 again',
    eightAgain: '8 again',
    roteQuality: 'rote quality',
    exceptional_sucesses_title: 'Exceptional success at',
    roll_dices_button_text: 'Roll dices!',
  },
});
