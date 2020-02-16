import {GameValueType} from '../GameValueTypes';

export type GameValue = {
  id: string;
  description?: string;
  type: GameValueType;
  parentId?: string | undefined;
};
