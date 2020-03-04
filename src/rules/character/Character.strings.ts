import {CharacterValueId} from './CharacterValue.id';
import LocalizedStrings from 'react-native-localization';

export type CharacterStrings = {
  [CharacterValueId.gnosis]: string;
  [CharacterValueId.willpower]: string;
  [CharacterValueId.wisdom]: string;
};

export const localization = new LocalizedStrings<CharacterStrings>({
  en: {
    [CharacterValueId.gnosis]: 'gnosis',
    [CharacterValueId.willpower]: 'willpower',
    [CharacterValueId.wisdom]: 'wisdom',
  },
});
