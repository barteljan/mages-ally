import {ArcanaType} from '../../rules/spells/arcana/Arcana.type';
export type ArcanaSwitchProps = {
  selected: ArcanaType;
  onChangedTo: (type: ArcanaType) => void;
};
