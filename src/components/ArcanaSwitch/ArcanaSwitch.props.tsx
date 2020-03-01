import {ArcanaType} from '../../rules/spells/arcana/Arcana.type';
import {Theme} from 'react-native-paper';
export type ArcanaSwitchProps = {
  selected: ArcanaType;
  onChangedTo: (type: ArcanaType) => void;
  theme: Theme;
};
