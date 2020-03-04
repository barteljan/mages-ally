import {Theme} from 'react-native-paper';
import {SpellCastingConfig} from '../../../rules/spells/Spell.config';
import {Spell} from '../../../rules/spells/Spell';
import {ViewStyle, TextStyle} from 'react-native';
export type SpellListItemProps = {
  theme: Theme;
  config: SpellCastingConfig;
  spell: Spell;
  showSpell: (id: string) => void;
  onAction: (id: string) => void;
  hideDescription?: boolean;
  actionItem?: Element;
  wrapperStyle?: ViewStyle;
  spellFactorStyle?: TextStyle;
};
