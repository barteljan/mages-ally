import {Yantra} from '../../../../../rules/spells/yantra/yantra';
import {ViewStyle} from 'react-native';
import {Theme} from 'react-native-paper';
export type YantraRowProps = {
  theme: Theme;
  yantra: Yantra;
  parent: string;
  containerStyle?: ViewStyle;
  deleteYantra?: (id: string, parent: string) => void;
  setYantraValue: (identifier: string, value: number, parent: string) => void;
};
