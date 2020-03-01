import {SpellCastingConfig} from '../../../../rules/spells/Spell.config';
import {Theme} from 'react-native-paper';
import {TextStyle} from 'react-native';

export type SpellFactorSectionDescriptionProps = {
  theme: Theme;
  spellCastingConfig: SpellCastingConfig;
  labelStyle?: TextStyle;
  showDices: boolean;
};
