import {ArcanaType} from './Arcana.type';
import LocalizedStrings from 'react-native-localization';

export type ArkanaStrings = {
  [ArcanaType.death]: string;
  [ArcanaType.fate]: string;
  [ArcanaType.forces]: string;
  [ArcanaType.life]: string;
  [ArcanaType.matter]: string;
  [ArcanaType.mind]: string;
  [ArcanaType.prime]: string;
  [ArcanaType.space]: string;
  [ArcanaType.spirit]: string;
  [ArcanaType.time]: string;
};

export const localization = new LocalizedStrings<ArkanaStrings>({
  en: {
    [ArcanaType.death]: 'death',
    [ArcanaType.fate]: 'fate',
    [ArcanaType.forces]: 'forces',
    [ArcanaType.life]: 'life',
    [ArcanaType.matter]: 'matter',
    [ArcanaType.mind]: 'mind',
    [ArcanaType.prime]: 'prime',
    [ArcanaType.space]: 'space',
    [ArcanaType.spirit]: 'spirit',
    [ArcanaType.time]: 'time',
  },
});
