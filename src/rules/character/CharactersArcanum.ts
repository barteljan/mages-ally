import {ArcanaType} from '../spells/ArcanaType';
export interface CharactersArcanum {
  type: ArcanaType;
  value: number;
  highest: boolean;
  rulingArcana: boolean;
}
