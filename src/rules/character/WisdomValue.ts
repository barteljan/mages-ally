import {BaseDiceModifier} from '../model/BaseDiceModifier';
import {GameValueType} from '../../GameValueTypes';
import {CharacterValueId} from './CharacterValue.id';

export type WisdomValue = BaseDiceModifier & {
  id: CharacterValueId.wisdom;
  type: GameValueType.characterValue;
};

export function makeWisdomValue(wisdom?: Partial<WisdomValue>): WisdomValue {
  return {
    id: CharacterValueId.wisdom,
    type: GameValueType.characterValue,
    diceModifier: 7,
    ...wisdom,
  };
}
