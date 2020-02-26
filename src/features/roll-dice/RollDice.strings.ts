import LocalizedStrings from 'react-native-localization';

export type RollDiceStrings = {
  choose_dice: string;
  tenAgain_title: string;
  tenAgain: string;
  nineAgain: string;
  eightAgain: string;
  roteQuality: string;
  exceptional_sucesses_title: string;
  roll_dice_button_text: string;
  dice_roll_title: string;
  message_dice_singular: string;
  message_dice_plural: string;
  message_success: string;
  message_success_description: string;
  message_exceptional_success: string;
  message_failure: string;
  message_failure_description: string;
  message_dramatic_failure: string;
  message_rerolls: string;
};

export enum LocalizationParams {
  diceNumber = '{{DICE_NUMBER}}',
  diceString = '{{DICE_STRING}}',
  successes = '{{SUCESSES}}',
  rerolled = '{{REROLLED}}',
}

export const localization = new LocalizedStrings<RollDiceStrings>({
  en: {
    choose_dice: 'Number of dice',
    tenAgain_title: 'Options:',
    tenAgain: '10 again',
    nineAgain: '9 again',
    eightAgain: '8 again',
    roteQuality: 'rote quality',
    exceptional_sucesses_title: 'Exceptional success at',
    roll_dice_button_text: 'Roll dice!',
    dice_roll_title:
      'Rolled ' +
      LocalizationParams.diceNumber +
      ' ' +
      LocalizationParams.diceString,
    message_success: 'Success',
    message_dice_singular: 'dice',
    message_dice_plural: 'dice',
    message_success_description:
      'Rolled ' +
      LocalizationParams.diceNumber +
      ' ' +
      LocalizationParams.diceString +
      ' with ' +
      LocalizationParams.successes +
      ' successes',
    message_exceptional_success: 'Exceptional Success!',
    message_failure: 'Failure',
    message_failure_description:
      'Rolled ' +
      LocalizationParams.diceNumber +
      ' ' +
      LocalizationParams.diceString +
      ' with no successes',
    message_dramatic_failure: 'Dramatic Failure!',
    message_rerolls: ' (' + LocalizationParams.rerolled + ' dice rolled again)',
  },
});
