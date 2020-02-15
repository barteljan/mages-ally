import {DiceModifier} from '../../data-types/DiceModifier';
import {GameValueType} from '../../GameValueTypes';

export type GnosisValue = DiceModifier & {
  id: 'gnosis';
  type: GameValueType.characterValue;
};

export function makeGnosisValue(gnosis: Partial<GnosisValue>): GnosisValue {
  return {
    id: 'gnosis',
    type: GameValueType.characterValue,
    value: 0,
    parentId: undefined,
    ...gnosis,
  };
}
