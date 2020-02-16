import {YantraType} from './Yantra.type';

export enum YantraGroups {
  location = 'location',
  actions = 'actions',
  tools = 'tools',
}

export type YantraGroup = {
  id: string;
  ids: string[];
};

export const yantraGroups: YantraGroup[] = [
  {
    id: YantraGroups.location,
    ids: [YantraType.demesne, YantraType.location, YantraType.verge],
  },
  {
    id: YantraGroups.actions,
    ids: [
      YantraType.roteSkill,
      YantraType.concentration,
      YantraType.highSpeech,
      YantraType.runes,
    ],
  },
  {
    id: YantraGroups.tools,
    ids: [
      YantraType.dedicatedTool,
      YantraType.pathTool,
      YantraType.orderTool,
      YantraType.materialSympathy,
      YantraType.representationalSympathy,
      YantraType.symbolicSympathy,
      YantraType.sacrament,
      YantraType.rareSacrament,
      YantraType.otherworldlySacrament,
      YantraType.persona,
    ],
  },
];
