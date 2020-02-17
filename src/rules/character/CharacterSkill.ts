import {BaseDiceModifier} from '../model/BaseDiceModifier';
import {GameValueType} from '../../GameValueTypes';

export type CharacterSkill = BaseDiceModifier & {
  type: GameValueType;
};

export function makeCharacterSkill(
  id: string,
  skill?: Partial<CharacterSkill>,
): CharacterSkill {
  return {
    id,
    type: GameValueType.skill,
    diceModifier: 0,
    ...skill,
  };
}
