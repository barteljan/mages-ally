import {Theme} from 'react-native-paper';
import {SpellState} from './Spell.redux';

export type SpellsProps = {
  theme: Theme;
  spells: SpellState[];
  showSpell: (id: string) => void;
};
