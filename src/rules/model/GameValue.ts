import {SpellFactor} from '../spells/spell-factors/SpellFactor';
import {CharactersArcanum} from '../character/CharactersArcanum';
import {CharacterSkill} from '../character/CharacterSkill';
import {GnosisValue} from '../character/GnosisValue';
import {SpellFactorRulesLevels} from '../spells/spell-factors/SpellFactor.type';

export type GameValue =
  | SpellFactor
  | CharactersArcanum
  | CharacterSkill
  | GnosisValue
  | SpellFactorRulesLevels;
