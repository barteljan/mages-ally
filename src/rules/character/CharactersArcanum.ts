import {ArcanaType} from '../spells/arcana/Arcana.type';
import {BaseDiceModifier} from '../../data-types/BaseDiceModifier';
import {GameValueType} from '../../GameValueTypes';

export type CharactersArcanum = BaseDiceModifier & {
  arcanumType: ArcanaType;
  highest: boolean;
  rulingArcana: boolean;
  type: GameValueType.arcanum;
};

export function makeCharactersArcanum(
  type: ArcanaType,
  arkanum?: Partial<CharactersArcanum>,
): CharactersArcanum {
  return {
    id: 'arcanum_' + type,
    arcanumType: type,
    type: GameValueType.arcanum,
    highest: false,
    rulingArcana: false,
    diceModifier: 0,
    ...arkanum,
  };
}
