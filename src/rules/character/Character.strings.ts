import {CharacterValueId} from './CharacterValue.id';
import LocalizedStrings from 'react-native-localization';

export type CharacterStrings = {
  [CharacterValueId.gnosis]: string;
  [CharacterValueId.willpower]: string;
};

export const localization = new LocalizedStrings<CharacterStrings>({
  en: {
    [CharacterValueId.gnosis]: 'gnosis',
    [CharacterValueId.willpower]: 'willpower',
  },
});
