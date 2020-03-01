import {Theme} from 'react-native-paper';
import {SpellState} from '../Spell.redux';
export type SpellListItemProps = {
  theme: Theme;
  item: SpellState;
  showSpell: (id: string) => void;
};
