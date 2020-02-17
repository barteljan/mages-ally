import {BaseDiceModifier} from '../model/BaseDiceModifier';
import {GameValueType} from '../../GameValueTypes';
import {CharacterValueId} from './CharacterValue.id';

export type WillpowerValue = BaseDiceModifier & {
  id: CharacterValueId.willpower;
  type: GameValueType.characterValue;
};

export function makeWillpowerValue(
  willpower: Partial<WillpowerValue>,
): WillpowerValue {
  return {
    id: CharacterValueId.willpower,
    type: GameValueType.characterValue,
    diceModifier: 0,
    ...willpower,
  };
}
