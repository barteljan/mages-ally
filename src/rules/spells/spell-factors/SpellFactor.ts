import {SpellFactorLevel} from './SpellFactor.level';
import {SpellFactorType} from './SpellFactor.type';

export type SpellFactor = {
  type: SpellFactorType;
  level: SpellFactorLevel;
  value: number;
};
