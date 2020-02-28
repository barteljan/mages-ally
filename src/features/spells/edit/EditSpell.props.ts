import {SpellCastingConfig} from '../../../rules/spells/Spell.config';
import {Theme} from 'react-native-paper';
import {SpellFactorType} from '../../../rules/spells/spell-factors/SpellFactor.type';
import {SpellFactorLevel} from '../../../rules/spells/spell-factors/SpellFactor.level';
import {Spell} from '../../../rules/spells/Spell';

export type EditSpellProps = {
  theme: Theme;
  navigation: any;
  spellCastingConfig: SpellCastingConfig;
  spell: Spell;
  setValue: (identifier: string, value: number, parent: string) => void;
  setStringValue: (
    identifier: string,
    value: string | undefined,
    parent: string,
  ) => void;
  setBooleanValue: (identifier: string, value: boolean, parent: string) => void;
  setSpellFactorLevel: (
    factor: SpellFactorType,
    level: SpellFactorLevel,
    parent: string,
  ) => void;
  setSpellFactorValue: (
    factor: SpellFactorType,
    value: number,
    parent: string,
  ) => void;
  deleteYantra: (id: string, parent: string) => void;
  setYantraValue: (identifier: string, value: number, parent: string) => void;
  chooseYantra: (parent: string) => void;
  save: (id: string) => void;
};
