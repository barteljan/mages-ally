import {Theme} from 'react-native-paper';

export type NumberSwitchProps = {
  identifier: string;
  parent: string;
  singularItemLabel: string;
  pluralItemLabel: string;
  minValue: number;
  maxValue: number;
  selected: number;
  onChangedTo: (identifier: string, value: number, parent: string) => void;
  theme: Theme;
};
