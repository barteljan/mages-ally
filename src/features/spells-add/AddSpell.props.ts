import {SpellCastingConfig} from '../../rules/spells/Spell.config';

export type AddSpellProps = {
  spellCastingConfig: SpellCastingConfig;
  setValue: (identifier: string, value: number) => void;
  setStringValue: (identifier: string, value: string | undefined) => void;
};
