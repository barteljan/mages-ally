import {DiceModifier} from '../../data-types/DiceModifier';
import {GameValueType} from '../../GameValueTypes';

export type CharacterSkill = DiceModifier & {
  value: number;
  type: GameValueType;
};

export function makeCharacterSkill(
  id: string,
  skill?: Partial<CharacterSkill>,
): CharacterSkill {
  return {
    id,
    type: GameValueType.skill,
    value: 0,
    ...skill,
  };
}
