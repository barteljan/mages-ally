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
  dice_roll_title: string;
  message_dice_singular: string;
  message_dice_plural: string;
  message_success: string;
  message_success_description: string;
  message_exceptional_success: string;
  message_failure: string;
  message_failure_description: string;
  message_dramatic_failure: string;
}

export enum LocalizationParams {
  dicesNumber = '{{DICES_NUMBER}}',
  dicesString = '{{DICES_STRING}}',
  successes = '{{SUCESSES}}',
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
    dice_roll_title:
      'Rolled ' +
      LocalizationParams.dicesNumber +
      ' ' +
      LocalizationParams.dicesString,
    message_success: 'Success',
    message_dice_singular: 'dice',
    message_dice_plural: 'dices',
    message_success_description:
      'Rolled ' +
      LocalizationParams.dicesNumber +
      ' ' +
      LocalizationParams.dicesString +
      ' with ' +
      LocalizationParams.successes +
      ' successes.',
    message_exceptional_success: 'Exceptional Success!',
    message_failure: 'Failure',
    message_failure_description:
      'Rolled ' +
      LocalizationParams.dicesNumber +
      ' ' +
      LocalizationParams.dicesString +
      ' with no successes.',
    message_dramatic_failure: 'Dramatic Failure!',
  },
});
