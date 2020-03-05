import {DiceRoll} from '../../../rules/dice-roll/DiceRoll';
import {SpellRollConfiguration} from '../../../rules/spells/roll/SpellRollConfiguration';

export type SpellRollInfoConfig = {
  paradoxRoll: DiceRoll | undefined;
  containParadoxRoll: DiceRoll | undefined;
  spellRoll: DiceRoll | undefined;
  spellRollConfig: SpellRollConfiguration;
};

export function makeSpellRollInfoConfig(
  spellRollConfig: SpellRollConfiguration,
  partial?: Partial<SpellRollInfoConfig>,
): SpellRollInfoConfig {
  return {
    paradoxRoll: undefined,
    containParadoxRoll: undefined,
    spellRoll: undefined,
    spellRollConfig,
    ...partial,
  };
}
