import {SpellFactorLevel} from './SpellFactor.level';
import {SpellFactorType} from './SpellFactor.type';
import {DiceModifier} from '../../../data-types/DiceModifier';

export type SpellFactor = DiceModifier & {
  spellFactorType: SpellFactorType;
  level: SpellFactorLevel;
};
