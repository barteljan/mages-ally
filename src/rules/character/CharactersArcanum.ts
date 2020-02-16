import {ArcanaType} from '../spells/ArcanaType';
import {DiceModifier} from '../../data-types/DiceModifier';
import {GameValueType} from '../../GameValueTypes';

export type CharactersArcanum = DiceModifier & {
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
