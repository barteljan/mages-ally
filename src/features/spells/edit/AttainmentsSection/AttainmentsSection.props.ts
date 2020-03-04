import {EditSpellsStyle} from '../EditSpell.styles';
import {Theme} from 'react-native-paper';
import {SpellCastingConfig} from '../../../../rules/spells/Spell.config';

export type AttainmentsSectionProps = {
  theme: Theme;
  spellCastingConfig: SpellCastingConfig;
  setBooleanValue: (identifier: string, value: boolean, parent: string) => void;
  onChangeCollapse: (collapse: boolean) => void;
  collapsed: boolean;
  styles: EditSpellsStyle;
};
