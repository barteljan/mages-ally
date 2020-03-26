import {GameValueType} from '../../GameValueTypes';
import {BaseGameValue} from './BaseGameValue';

export type GameValueGroup<IdType extends string = string> = BaseGameValue & {
  id: IdType;
  type: GameValueType.valueGroup;
  values: {[id: string]: BaseGameValue};
};
