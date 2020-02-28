import {Theme} from 'react-native-paper';
import {Spell} from '../../../../rules/spells/Spell';
import {ViewStyle, TextStyle} from 'react-native';

export type SpellInformationProps = {
  theme: Theme;
  spell: Spell;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
};
