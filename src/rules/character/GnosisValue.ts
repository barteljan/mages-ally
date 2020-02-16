import {BaseDiceModifier} from '../../data-types/BaseDiceModifier';
import {GameValueType} from '../../GameValueTypes';
import {CharacterValueId} from './CharacterValue.id';

export type GnosisValue = BaseDiceModifier & {
  id: CharacterValueId.gnosis;
  type: GameValueType.characterValue;
};

export function makeGnosisValue(gnosis: Partial<GnosisValue>): GnosisValue {
  return {
    id: CharacterValueId.gnosis,
    type: GameValueType.characterValue,
    diceModifier: 0,
    ...gnosis,
  };
}
