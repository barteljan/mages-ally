import {EditSpellsStyle} from '../EditSpell.styles';
import {Theme} from 'react-native-paper';
import {SpellCastingConfig} from '../../../../rules/spells/Spell.config';
import {Spell} from '../../../../rules/spells/Spell';

export type YantraSectionProps = {
  theme: Theme;
  spellCastingConfig: SpellCastingConfig;
  spell: Spell;
  //setValue: (identifier: string, value: number, parent: string) => void;
  /*
  setStringValue: (
    identifier: string,
    value: string | undefined,
    parent: string,
  ) => void;*/
  //setBooleanValue: (identifier: string, value: boolean, parent: string) => void;
  deleteYantra: (id: string, parent: string) => void;
  chooseYantra: (parent: string) => void;
  onChangeCollapse: (collapse: boolean) => void;
  setYantraValue: (identifier: string, value: number, parent: string) => void;
  collapsed: boolean;
  styles: EditSpellsStyle;
};
