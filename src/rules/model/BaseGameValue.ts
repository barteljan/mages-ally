import {GameValueType} from '../../GameValueTypes';

export type BaseGameValue = {
  id: string;
  description?: string;
  type: GameValueType;
  parentId?: string | undefined;
};
