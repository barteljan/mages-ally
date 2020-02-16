import {SpellFactor} from '../rules/spells/spell-factors/SpellFactor';
import {CharactersArcanum} from '../rules/character/CharactersArcanum';
import {CharacterSkill} from '../rules/character/CharacterSkill';
import {GnosisValue} from '../rules/character/GnosisValue';
import {SpellFactorRulesLevels} from '../rules/spells/spell-factors/SpellFactor.type';

export type GameValue =
  | SpellFactor
  | CharactersArcanum
  | CharacterSkill
  | GnosisValue
  | SpellFactorRulesLevels;
