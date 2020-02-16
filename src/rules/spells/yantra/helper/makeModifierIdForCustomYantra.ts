import {YantraType} from '../Yantra.type';
import {Yantra} from '../yantra';
import {GameValueType} from '../../../../GameValueTypes';

export function makeModifierIdForCustomYantra(yantra: Yantra): string {
  return GameValueType.yantra + '_' + YantraType.custom + '_' + yantra.id;
}
