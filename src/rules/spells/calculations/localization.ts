import {DefaultKeys} from './DefaultKeys';
import {ArcanaType} from '../ArcanaType';
import LocalizedStrings from 'react-native-localization';

export interface DiceModifiersStrings {
  [DefaultKeys.additionalDice]: string;
  [DefaultKeys.gnosis]: string;
  [DefaultKeys.roteSkill]: string;
  [DefaultKeys.willpower]: string;
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
}

export const localization = new LocalizedStrings<DiceModifiersStrings>({
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
    [DefaultKeys.gnosis]: 'gnosis',
    [DefaultKeys.additionalDice]: 'additional dice',
    [DefaultKeys.roteSkill]: 'rote skill',
    [DefaultKeys.willpower]: 'willpower',
  },
});
