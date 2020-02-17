import {BaseManaModifier, makeManaModifier} from '../../model/BaseManaModifier';
import {SpellValueIds} from './SpellValueIds';
import {GameValueType} from '../../../GameValueTypes';

export type NotRulingArcanaValue = BaseManaModifier & {
  id: SpellValueIds.notFromRulingArcana;
  type: GameValueType.spellValue;
};

export function makeNotFromRulingArcana(
  value?: Partial<NotRulingArcanaValue>,
): NotRulingArcanaValue {
  return (makeManaModifier(SpellValueIds.notFromRulingArcana, {
    type: GameValueType.spellValue,
    ...value,
  }) as unknown) as NotRulingArcanaValue;
}
