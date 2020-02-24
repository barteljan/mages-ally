import {EditSpellsStyle} from '../EditSpell.styles';
import {Theme} from 'react-native-paper';
import {SpellCastingConfig} from '../../../../rules/spells/Spell.config';
import {SpellFactorType} from '../../../../rules/spells/spell-factors/SpellFactor.type';
import {SpellFactorLevel} from '../../../../rules/spells/spell-factors/SpellFactor.level';

export type SpellFactorSectionProps = {
  theme: Theme;
  spellCastingConfig: SpellCastingConfig;
  setValue: (identifier: string, value: number, parent: string) => void;
  setStringValue: (
    identifier: string,
    value: string | undefined,
    parent: string,
  ) => void;
  setBooleanValue: (identifier: string, value: boolean, parent: string) => void;
  onChangeCollapse: (collapse: boolean) => void;
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
  collapsed: boolean;
  styles: EditSpellsStyle;
};
