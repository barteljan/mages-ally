import {makeTextPickerRowItem, TextPickerRowItem} from '../Form/TextPickerRow';
import {ArcanaType} from '../../rules/spells/arcana/Arcana.type';
import {localization as arkanaLocalization} from '../../rules/spells/arcana/Arcana.strings';

export const makeArkanaSwitchRow = (
  id: string,
  parent: string,
  title: string,
  value: ArcanaType,
): TextPickerRowItem => {
  let arcana: {value: string; label: string}[] = [];

  Object.keys(ArcanaType).forEach(type => {
    arcana.push({
      label: arkanaLocalization[type as ArcanaType],
      value: type as ArcanaType,
    });
  });

  const row = makeTextPickerRowItem(id, arcana, {
    parent,
    value: value,
    label: title,
  });

  return row;
};
