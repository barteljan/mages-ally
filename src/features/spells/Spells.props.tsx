import {Theme} from 'react-native-paper';
import {SpellState} from './Spell.state';

export type SpellsProps = {
  theme: Theme;
  spells: SpellState[];
  showSpell: (id: string) => void;
  rollDice: (id: string) => void;
  delete: (id: string) => void;
};
