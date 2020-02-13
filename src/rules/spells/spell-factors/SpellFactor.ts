import {SpellFactorLevel} from './SpellFactor.level';
import {SpellFactorType} from './SpellFactor.type';

export interface SpellFactor {
  type: SpellFactorType;
  level: SpellFactorLevel;
  value: number;
}
