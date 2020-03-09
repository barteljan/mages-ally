import LocalizedStrings from 'react-native-localization';

export type RollItemString = {
  tenAgain: string;
  nineAgain: string;
  eightAgain: string;
  none: string;
  roteQuality: string;
  success: string;
  exceptional_success: string;
  failure: string;
  dramatic_failure: string;
};

export const localization = new LocalizedStrings<RollItemString>({
  en: {
    tenAgain: '10 again',
    nineAgain: '9 again',
    eightAgain: '8 again',
    none: 'no roll again',
    roteQuality: 'rote quality',
    success: 'Success',
    exceptional_success: 'Exceptional Success!',
    failure: 'Failure',
    dramatic_failure: 'Dramatic Failure!',
  },
});
