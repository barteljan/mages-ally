import {Theme} from 'react-native-paper';
import {SpellCastingConfig} from '../../../rules/spells/Spell.config';
import {Spell} from '../../../rules/spells/Spell';
import {SpellRollState} from '../Spell.state';
import {SpellRollInfoConfig} from './SpellRollInfoConfig';

export type SpellRollScreenProps = {
  navigation: any;
  theme: Theme;
  config: SpellCastingConfig;
  spell: Spell;
  roll: SpellRollState;
  spellRollInfoConfig: SpellRollInfoConfig | undefined;
  showSpell: (id: string) => void;
  setValue: (identifier: string, value: number, parent: string) => void;
  setStringValue: (
    identifier: string,
    value: string | undefined,
    parent: string,
  ) => void;
  setBooleanValue: (identifier: string, value: boolean, parent: string) => void;
  rollDice: (spellId: string) => void;
};
