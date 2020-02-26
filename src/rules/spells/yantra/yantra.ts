import {BaseDiceModifier} from '../../model/BaseDiceModifier';
import {GameValueType} from '../../../GameValueTypes';
import {YantraType} from './Yantra.type';
import {
  yantraTitleLocalization,
  yantraDescriptionLocalization,
} from './Yantra.strings';

export type BaseYantra<
  Type extends string,
  Modifier extends number,
  Id extends string
> = BaseDiceModifier & {
  id: Id;
  diceModifier: Modifier;
  fixedDice: boolean;
  maxDice: number;
  yantraType: Type;
  unique: boolean;
  type: GameValueType.yantra;
  name?: string;
};

export type Yantra =
  | BaseYantra<YantraType.demesne, 2, YantraType.demesne>
  | BaseYantra<YantraType.location, 1, YantraType.location>
  | BaseYantra<YantraType.verge, 2, YantraType.verge>
  | BaseYantra<YantraType.concentration, 2, YantraType.concentration>
  | BaseYantra<YantraType.highSpeech, 2, YantraType.highSpeech>
  | BaseYantra<YantraType.runes, 2, YantraType.runes>
  | BaseYantra<YantraType.dedicatedTool, 0, YantraType.dedicatedTool>
  | BaseYantra<YantraType.pathTool, 1, string>
  | BaseYantra<YantraType.orderTool, 1, string>
  | BaseYantra<YantraType.materialSympathy, 2, string>
  | BaseYantra<YantraType.representationalSympathy, 1, string>
  | BaseYantra<YantraType.symbolicSympathy, 0, string>
  | BaseYantra<YantraType.sacrament, 1, string>
  | BaseYantra<YantraType.rareSacrament, 2, string>
  | BaseYantra<YantraType.otherworldlySacrament, 3, string>
  | BaseYantra<YantraType.persona, 1, YantraType.persona>
  | BaseYantra<YantraType.persona, 2, YantraType.persona>
  | BaseYantra<YantraType.persona, 3, YantraType.persona>
  | BaseYantra<YantraType.persona, 4, YantraType.persona>
  | BaseYantra<YantraType.roteSkill, number, YantraType.roteSkill>
  | BaseYantra<YantraType.custom, 1, string>
  | BaseYantra<YantraType.custom, 2, string>
  | BaseYantra<YantraType.custom, 3, string>
  | BaseYantra<YantraType.custom, 4, string>
  | BaseYantra<YantraType.custom, 5, string>;

export const makeRoteYantra = (value: number): Yantra => {
  return {
    id: YantraType.roteSkill,
    diceModifier: value,
    name: yantraTitleLocalization[YantraType.roteSkill],
    description: yantraDescriptionLocalization[YantraType.roteSkill],
    type: GameValueType.yantra,
    yantraType: YantraType.roteSkill,
    fixedDice: false,
    unique: true,
    maxDice: 10,
  };
};

export const staticYantras = {
  [YantraType.demesne]: {
    id: YantraType.demesne,
    type: GameValueType.yantra,
    yantraType: YantraType.demesne,
    fixedDice: true,
    unique: true,
    maxDice: 2,
    diceModifier: 2,
  },
  [YantraType.location]: {
    id: YantraType.location,
    type: GameValueType.yantra,
    yantraType: YantraType.location,
    fixedDice: true,
    unique: true,
    maxDice: 1,
    diceModifier: 1,
  },
  [YantraType.verge]: {
    id: YantraType.verge,
    type: GameValueType.yantra,
    yantraType: YantraType.verge,
    fixedDice: true,
    unique: true,
    maxDice: 2,
    diceModifier: 2,
  },
  [YantraType.concentration]: {
    id: YantraType.concentration,
    type: GameValueType.yantra,
    yantraType: YantraType.concentration,
    unique: true,
    fixedDice: true,
    maxDice: 2,
    diceModifier: 2,
  },
  [YantraType.highSpeech]: {
    id: YantraType.highSpeech,
    type: GameValueType.yantra,
    yantraType: YantraType.highSpeech,
    fixedDice: true,
    unique: true,
    maxDice: 2,
    diceModifier: 2,
  },
  [YantraType.runes]: {
    id: YantraType.runes,
    type: GameValueType.yantra,
    yantraType: YantraType.runes,
    fixedDice: true,
    unique: true,
    maxDice: 2,
    diceModifier: 2,
  },
  [YantraType.dedicatedTool]: {
    id: YantraType.dedicatedTool,
    type: GameValueType.yantra,
    yantraType: YantraType.dedicatedTool,
    fixedDice: true,
    unique: true,
    maxDice: 0,
    diceModifier: 0,
  },
  [YantraType.pathTool]: {
    id: YantraType.pathTool,
    type: GameValueType.yantra,
    yantraType: YantraType.pathTool,
    fixedDice: true,
    unique: false,
    maxDice: 1,
    diceModifier: 1,
  },
  [YantraType.orderTool]: {
    id: YantraType.orderTool,
    type: GameValueType.yantra,
    yantraType: YantraType.orderTool,
    fixedDice: true,
    unique: false,
    maxDice: 1,
    diceModifier: 1,
  },
  [YantraType.materialSympathy]: {
    id: YantraType.orderTool,
    type: GameValueType.yantra,
    yantraType: YantraType.materialSympathy,
    fixedDice: true,
    unique: false,
    maxDice: 2,
    diceModifier: 2,
  },
  [YantraType.representationalSympathy]: {
    id: YantraType.representationalSympathy,
    type: GameValueType.yantra,
    yantraType: YantraType.representationalSympathy,
    fixedDice: true,
    unique: false,
    maxDice: 1,
    diceModifier: 1,
  },
  [YantraType.symbolicSympathy]: {
    id: YantraType.symbolicSympathy,
    type: GameValueType.yantra,
    yantraType: YantraType.symbolicSympathy,
    fixedDice: true,
    unique: false,
    maxDice: 0,
    diceModifier: 0,
  },
  [YantraType.sacrament]: {
    id: YantraType.sacrament,
    type: GameValueType.yantra,
    yantraType: YantraType.sacrament,
    fixedDice: true,
    unique: false,
    maxDice: 1,
    diceModifier: 1,
  },
  [YantraType.rareSacrament]: {
    id: YantraType.rareSacrament,
    type: GameValueType.yantra,
    yantraType: YantraType.rareSacrament,
    fixedDice: true,
    unique: false,
    maxDice: 2,
    diceModifier: 2,
  },
  [YantraType.otherworldlySacrament]: {
    id: YantraType.otherworldlySacrament,
    type: GameValueType.yantra,
    yantraType: YantraType.otherworldlySacrament,
    fixedDice: true,
    unique: false,
    maxDice: 3,
    diceModifier: 3,
  },
  [YantraType.roteSkill]: makeRoteYantra(0),
  [YantraType.persona]: {
    id: YantraType.persona,
    type: GameValueType.yantra,
    yantraType: YantraType.persona,
    fixedDice: false,
    unique: true,
    maxDice: 4,
    diceModifier: 0,
  },
};
