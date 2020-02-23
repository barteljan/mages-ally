import {ViewStyle} from 'react-native';
import {Theme} from 'react-native-paper';

export type FormSectionProps = {
  theme: Theme;
  children: Element;
  title: (identifier: string, collapsed: boolean) => Element;
  containerStyles?: ViewStyle;
  titleContainerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  collapsed: boolean;
  identifier: string;
  onChangeCollapse: (collapse: boolean) => void;
};
