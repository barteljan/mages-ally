import {Yantra} from '../../../../../rules/spells/yantra/yantra';
import {Theme} from 'react-native-paper';
export type YantraSelectRowProps = {
  theme: Theme;
  yantra: Yantra;
  didSelectYantra: (yantra: Yantra) => void;
  lastRowInSection: boolean;
};
