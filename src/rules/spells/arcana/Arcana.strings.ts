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
    [ArcanaType.death]: 'Death',
    [ArcanaType.fate]: 'Fate',
    [ArcanaType.forces]: 'Forces',
    [ArcanaType.life]: 'Life',
    [ArcanaType.matter]: 'Matter',
    [ArcanaType.mind]: 'Mind',
    [ArcanaType.prime]: 'Prime',
    [ArcanaType.space]: 'Space',
    [ArcanaType.spirit]: 'Spirit',
    [ArcanaType.time]: 'Time',
  },
});
