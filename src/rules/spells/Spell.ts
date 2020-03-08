import {SpellModifiersFromCasterResult} from './calculations/spellModifiersFromCaster';
import {SpellModifiersFromSpecificationResult} from './calculations/spellModifiersFromSpecification';
import {SpellModifiersFromParadoxCircumstances} from './calculations/spellModifiersFromParadoxCircumstances';
import {ParadoxDiceFromReachValue} from './spell-values/ParadoxDiceFromReachValue';
import {SpellValueIds} from './spell-values/SpellValueIds';
import {DiceRollAgainType} from '../dice-roll/DiceRollAgainType';
import {SpellCastingConfig} from './Spell.config';

export type Spell = {
  config: SpellCastingConfig;
  modifiers:
    | SpellModifiersFromCasterResult
    | SpellModifiersFromSpecificationResult
    | (SpellModifiersFromParadoxCircumstances & {
        [SpellValueIds.paradoxDiceFromReach]?: ParadoxDiceFromReachValue;
      });
  roll: SpellRoll;
  reaches: {
    free: number;
    needed: number;
  };
  mana: number;
  maxYantras: number;
};

export type SpellRoll = {
  dices: {
    number: number;
    type: DiceRollAgainType;
    successesForExceptionalSuccess: number;
    oneAsChanceDice: boolean;
  };
  paradox: {
    number: number;
    type: DiceRollAgainType;
    successesForExceptionalSuccess: number;
    oneAsChanceDice: boolean;
  };
};
