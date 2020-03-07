import {DiceRoll} from '../../../../rules/dice-roll/DiceRoll';
import {SpellRollConfiguration} from '../../../../rules/spells/roll/SpellRollConfiguration';

export type SpellRollInfoConfig = {
  title: string | undefined;
  wisdom: number;
  paradoxRoll: DiceRoll | undefined;
  containParadoxRoll: DiceRoll | undefined;
  spellRoll: DiceRoll | undefined;
  spellRollConfig: SpellRollConfiguration;
};

export function makeSpellRollInfoConfig(
  title: string | undefined,
  spellRollConfig: SpellRollConfiguration,
  wisdom: number,
  partial?: Partial<SpellRollInfoConfig>,
): SpellRollInfoConfig {
  return {
    title,
    wisdom,
    paradoxRoll: undefined,
    containParadoxRoll: undefined,
    spellRoll: undefined,
    spellRollConfig,
    ...partial,
  };
}
