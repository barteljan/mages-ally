import {BaseYantra, Yantra} from '../../../../rules/spells/yantra/yantra';
import {Theme} from 'react-native-paper';
import {SectionListData} from 'react-native';
import {YantraType} from '../../../../rules/spells/yantra/Yantra.type';
export type ChooseYantraScreenProps = {
  theme: Theme;
  parent: string;
  yantras: SectionListData<BaseYantra<YantraType, number, string>>;
  didSelectYantra: (yantra: Yantra, parent: string) => void;
  addCustomYantra: (title: string, value: number, parent: string) => void;
};
