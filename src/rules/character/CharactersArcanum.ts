import {ArcanaType} from '../spells/arcana/Arcana.type';
import {BaseDiceModifier} from '../model/BaseDiceModifier';
import {GameValueType} from '../../GameValueTypes';

export type CharactersArcanum<
  Type extends ArcanaType = ArcanaType
> = BaseDiceModifier & {
  id: Type;
  arcanumType: Type;
  highest: boolean;
  rulingArcana: boolean;
  type: GameValueType.arcanum;
};

export function makeCharactersArcanum<Type extends ArcanaType = ArcanaType>(
  type: Type,
  arkanum?: Partial<CharactersArcanum>,
): CharactersArcanum {
  return {
    id: type,
    arcanumType: type,
    type: GameValueType.arcanum,
    highest: false,
    rulingArcana: false,
    diceModifier: 0,
    ...arkanum,
  };
}
