import LocalizedStrings from 'react-native-localization';

export type RollListItemsString = {
  tenAgain: string;
  nineAgain: string;
  eightAgain: string;
  roteQuality: string;
  success: string;
  exceptional_success: string;
  failure: string;
  dramatic_failure: string;
};

export const localization = new LocalizedStrings<RollListItemsString>({
  en: {
    tenAgain: '10 again',
    nineAgain: '9 again',
    eightAgain: '8 again',
    roteQuality: 'rote quality',
    success: 'Success',
    exceptional_success: 'Exceptional\nSuccess!',
    failure: 'Failure',
    dramatic_failure: 'Dramatic\nFailure!',
  },
});
