import {YantraType} from './Yantra.type';
import LocalizedStrings from 'react-native-localization';

export type YantraTitleStrings = {
  [YantraType.demesne]: string;
  [YantraType.location]: string;
  [YantraType.verge]: string;
  [YantraType.roteSkill]: string;
  [YantraType.concentration]: string;
  [YantraType.highSpeech]: string;
  [YantraType.runes]: string;
  [YantraType.dedicatedTool]: string;
  [YantraType.pathTool]: string;
  [YantraType.orderTool]: string;
  [YantraType.materialSympathy]: string;
  [YantraType.representationalSympathy]: string;
  [YantraType.symbolicSympathy]: string;
  [YantraType.sacrament]: string;
  [YantraType.rareSacrament]: string;
  [YantraType.otherworldlySacrament]: string;
  [YantraType.persona]: string;
  [YantraType.custom]: string;
};

export type YantraDescriptionStrings = {
  [YantraType.demesne]: string;
  [YantraType.location]: string;
  [YantraType.verge]: string;
  [YantraType.roteSkill]: string;
  [YantraType.concentration]: string;
  [YantraType.highSpeech]: string;
  [YantraType.runes]: string;
  [YantraType.dedicatedTool]: string;
  [YantraType.pathTool]: string;
  [YantraType.orderTool]: string;
  [YantraType.materialSympathy]: string;
  [YantraType.representationalSympathy]: string;
  [YantraType.symbolicSympathy]: string;
  [YantraType.sacrament]: string;
  [YantraType.rareSacrament]: string;
  [YantraType.otherworldlySacrament]: string;
  [YantraType.persona]: string;
  [YantraType.custom]: string;
};

export const yantraTitleLocalization = new LocalizedStrings<YantraTitleStrings>(
  {
    en: {
      [YantraType.demesne]: 'Demesne',
      [YantraType.location]: 'Location',
      [YantraType.verge]: 'Supernal Verge',
      [YantraType.roteSkill]: 'Rote Skill Mudra',
      [YantraType.concentration]: 'Concentration',
      [YantraType.highSpeech]: 'High Speech',
      [YantraType.runes]: 'Runes',
      [YantraType.dedicatedTool]: 'Dedicated Tool',
      [YantraType.pathTool]: 'Path Tool',
      [YantraType.orderTool]: 'Order Tool',
      [YantraType.materialSympathy]: 'Material Sympathy',
      [YantraType.representationalSympathy]: 'Representational Sympathy',
      [YantraType.symbolicSympathy]: 'Symbolic Sympathy',
      [YantraType.sacrament]: 'Sacrament',
      [YantraType.rareSacrament]: 'Rare Sacrament',
      [YantraType.otherworldlySacrament]: 'Otherworldly Sacrament',
      [YantraType.persona]: 'Persona',
      [YantraType.custom]: 'Custom Yantra',
    },
  },
);

export const yantraDescriptionLocalization = new LocalizedStrings<
  YantraDescriptionStrings
>({
  en: {
    [YantraType.demesne]: 'A prepared ritual space with a soul stone',
    [YantraType.location]: 'A place and time symbolically linked to the spell.',
    [YantraType.verge]: 'A place where the Supernal touches the Fallen World.',
    [YantraType.roteSkill]:
      'Uses skill dots as a bonus. The character must be free to make whatever mnemonic gestures are used to recall the Rote.',
    [YantraType.concentration]:
      'Duration must be greater than a turn. If the mage is hurt or takes a non-reflexive action while the spell is active, it ends immediately.',
    [YantraType.highSpeech]:
      'Must be spoken aloud. Cannot be used reflexively.',
    [YantraType.runes]:
      'The subject is marked with runes. Ritual casting only. If anything damages or disrupts the runes while the spell is active, it ends immediately.',
    [YantraType.dedicatedTool]:
      'An item that synchronizes with her Nimbus and that feeds in to her understanding of magic. Reduces Paradox by 2 dice.',
    [YantraType.pathTool]:
      'Tools which align closely to her Path. See p.121 for examples.',
    [YantraType.orderTool]:
      'Tools which draw upon an Order’s symbols rather than those of the Supernal world directly, focusing magic in a way that matches their teachings.',
    [YantraType.materialSympathy]:
      'An item sympathetically linked to the subject <i>as they are now</i>. At least one sympathetic tool is required for sympathetic casting. Does not grant a bonus when used with Sympathetic Range or Temporal Sympathy Attainments.',
    [YantraType.representationalSympathy]:
      'An item sympathetically linked to the subject <i>as they were previously</i>. At least one sympathetic tool is required for sympathetic casting. Does not grant a bonus when used with Sympathetic Range or Temporal Sympathy Attainments.',
    [YantraType.symbolicSympathy]:
      'An indirect representation of the subject. At least one sympathetic tool is required for sympathetic casting.',
    [YantraType.sacrament]:
      'An object symbolic of the spell that the mage destroys during casting.',
    [YantraType.rareSacrament]:
      'A sacrament which requires significant effort to acquire.',
    [YantraType.otherworldlySacrament]:
      'A sacrament from somewhere other than the material realm.',
    [YantraType.persona]:
      'A persona Yantra keys in to the mage’s Shadow Name and Cabal Theme Merits.',
    [YantraType.custom]: 'An other Yantra not described in the rules',
  },
});
