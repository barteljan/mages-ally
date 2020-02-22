import {SpellCastingConfig} from '../../../rules/spells/Spell.config';
import {Theme} from 'react-native-paper';

export type EditSpellProps = {
  theme: Theme;
  spellCastingConfig: SpellCastingConfig;
  setValue: (identifier: string, value: number, parent: string) => void;
  setStringValue: (
    identifier: string,
    value: string | undefined,
    parent: string,
  ) => void;
  setBooleanValue: (identifier: string, value: boolean, parent: string) => void;
};
