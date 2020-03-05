import StringMap from '../../data-types/StringMap';
import {
  SpellRollConfiguration,
  makeSpellRollConfiguration,
} from '../../rules/spells/roll/SpellRollConfiguration';
import {SpellCastingConfig} from '../../rules/spells/Spell.config';
import {SpellStatus} from './Spell.status';
import {Spell} from '../../rules/spells/Spell';

export type SpellsState = {
  spells: StringMap<SpellState>;
};

export type SpellRollState = {
  config: SpellRollConfiguration;
  paradoxRollId: string | undefined;
  spellRollId: string | undefined;
  containParadoxRollId: string | undefined;
};

export const makeSpellRollState = (
  roll?: Partial<SpellRollState>,
): SpellRollState => {
  return {
    config: makeSpellRollConfiguration(),
    paradoxRollId: undefined,
    spellRollId: undefined,
    containParadoxRollId: undefined,
    ...roll,
  };
};

export type SpellState = {
  spellCastingConfig: SpellCastingConfig;
  status: SpellStatus;
  roll: SpellRollState;
  spell: Spell;
};
