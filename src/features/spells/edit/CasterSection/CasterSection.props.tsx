import {EditSpellsStyle} from '../EditSpell.styles';
import {Theme} from 'react-native-paper';
import {SpellCastingConfig} from '../../../../rules/spells/Spell.config';

export type CasterSectionProps = {
  theme: Theme;
  spellCastingConfig: SpellCastingConfig;
  setValue: (
    identifier: string,
    value: number | undefined,
    parent: string,
  ) => void;
  setStringValue: (
    identifier: string,
    value: string | undefined,
    parent: string,
  ) => void;
  setBooleanValue: (
    identifier: string,
    value: boolean | undefined,
    parent: string,
  ) => void;
  onChangeCollapse: (collapse: boolean) => void;
  collapsed: boolean;
  styles: EditSpellsStyle;
};
