import LocalizedStrings from 'react-native-localization';
import {SleeperWitnesses} from './SleeperWitnesses';
import {ParadoxResolution} from './ParadoxResolution';

export type ParadoxStrings = {
  [SleeperWitnesses.few]: string;
  [SleeperWitnesses.fullCrowd]: string;
  [SleeperWitnesses.largeGroup]: string;
  [SleeperWitnesses.none]: string;
  [SleeperWitnesses.one]: string;
  [ParadoxResolution.contain]: string;
  [ParadoxResolution.release]: string;
};

export const labelForSleeperWittness = (witness: SleeperWitnesses) =>
  localization[witness];

export const labelForParadoxResolution = (
  paradoxResolution: ParadoxResolution,
) => localization[paradoxResolution];

export const localization = new LocalizedStrings<ParadoxStrings>({
  en: {
    [SleeperWitnesses.few]: 'Few',
    [SleeperWitnesses.fullCrowd]: 'A crowd',
    [SleeperWitnesses.largeGroup]: 'A group',
    [SleeperWitnesses.none]: 'None',
    [SleeperWitnesses.one]: 'One',
    [ParadoxResolution.contain]: 'Contain Paradox',
    [ParadoxResolution.release]: 'Release Paradox',
  },
});
