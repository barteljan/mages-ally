import {SpellRollScreenProps} from '../SpellRoll.props';
import {ViewStyle} from 'react-native';

export type SpellRollParadoxSectionProps = SpellRollScreenProps & {
  containerStyles: ViewStyle;
  collapsed: boolean;
  onChangeCollapse: (collapsed: boolean) => void;
};
