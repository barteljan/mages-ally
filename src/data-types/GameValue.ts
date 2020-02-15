import {GameValueType} from '../GameValueTypes';

export type GameValue<T> = {
  id: string;
  description?: string;
  type: GameValueType;
  value: T;
  parentId?: string | undefined;
};
