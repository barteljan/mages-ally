import LocalizedStrings from 'react-native-localization';
import {SleeperWitnesses} from './SleeperWitnesses';

export type SleeperWitnessesStrings = {
  [SleeperWitnesses.few]: string;
  [SleeperWitnesses.fullCrowd]: string;
  [SleeperWitnesses.largeGroup]: string;
  [SleeperWitnesses.none]: string;
  [SleeperWitnesses.one]: string;
};

export const labelForSleeperWittness = (witness: SleeperWitnesses) =>
  localization[witness];

export const localization = new LocalizedStrings<SleeperWitnessesStrings>({
  en: {
    [SleeperWitnesses.few]: 'Few',
    [SleeperWitnesses.fullCrowd]: 'A crowd',
    [SleeperWitnesses.largeGroup]: 'A group',
    [SleeperWitnesses.none]: 'None',
    [SleeperWitnesses.one]: 'One',
  },
});
