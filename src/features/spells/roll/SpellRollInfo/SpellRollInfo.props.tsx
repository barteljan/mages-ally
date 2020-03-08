import {Theme} from 'react-native-paper';
import {SpellRollInfoConfig} from './SpellRollInfo.config';
export type SpellRollInfoProps = {
  theme: Theme;
  spellInformationConfig: SpellRollInfoConfig;
  collapsed: boolean;
  onSetCollapse: (collapse: boolean) => void;
};
