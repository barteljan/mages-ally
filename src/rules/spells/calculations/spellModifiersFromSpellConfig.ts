import {SpellCastingConfig} from '../Spell.config';
import {
  spellModifiersFromCaster,
  SpellModifiersFromCasterResult,
} from './spellModifiersFromCaster';
import {
  spellModifiersFromSpecification,
  SpellModifiersFromSpecificationResult,
} from './spellModifiersFromSpecification';
import StringMap from '../../../data-types/StringMap';
import {BaseDiceModifier, toDiceModifier} from '../../model/BaseDiceModifier';
import {
  BaseReachModifier,
  toReachModifier,
} from '../../model/BaseReachModifier';
import {BaseManaModifier, toManaModifier} from '../../model/BaseManaModifier';
import {
  SpellModifiersFromParadoxCircumstances,
  spellModifiersFromParadoxCircumstances,
} from './spellModifiersFromParadoxCircumstances';
import {
  BaseParadoxModifier,
  toParadoxModifier,
} from '../../model/BaseParadoxModifier';
import {
  DiceRollAgainType,
  bestRollAgainType,
} from '../../../rules/dice-roll/DiceRollAgainType';
import {
  makeParadoxDiceFromReachValue,
  ParadoxDiceFromReachValue,
} from '../spell-values/ParadoxDiceFromReachValue';
import {SpellValueIds} from '../spell-values/SpellValueIds';
import {SpellType} from '../Spell.type';

export type SpellRoll = {
  dices: {
    number: number;
    type: DiceRollAgainType;
  };
  paradox: {
    number: number;
    type: DiceRollAgainType;
  };
};

export type SpellModifiersFromSpellConfigResult = {
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
};

export function spellModifiersFromSpellConfig(
  config: SpellCastingConfig,
): SpellModifiersFromSpellConfigResult {
  let modifiers: StringMap<
    | BaseDiceModifier
    | BaseReachModifier
    | BaseManaModifier
    | BaseParadoxModifier
    | undefined
  > = {...spellModifiersFromCaster(config.caster, config.spell.type)};

  modifiers = {
    ...modifiers,
    ...spellModifiersFromSpecification(
      config.caster.highestSpellArcanum,
      config.spell,
    ),
  };

  modifiers = {
    ...modifiers,
    ...spellModifiersFromParadoxCircumstances(config.paradox),
  };

  let numberOfDices = 0;
  let neededReaches = 0;
  let neededMana = 0;

  //calculate dices, mana and reach for this config
  for (let key in modifiers) {
    const modifier = modifiers[key];

    const diceModifier = toDiceModifier(modifier);
    if (diceModifier) {
      numberOfDices += diceModifier.diceModifier;
    }

    const reachModifier = toReachModifier(modifier);
    if (reachModifier) {
      neededReaches += reachModifier.reachModifier;
    }

    const manaModifier = toManaModifier(modifier);
    if (manaModifier) {
      neededMana += manaModifier.manaModifier;
    }
  }

  const freeReaches =
    config.spell.type === SpellType.rote
      ? 5
      : config.caster.highestSpellArcanum.diceModifier -
        config.spell.requiredArcanumValue +
        1;

  //calculate paradox for this config
  if (neededReaches - freeReaches > 0) {
    const paradoxFromReaches = makeParadoxDiceFromReachValue({
      paradoxModifier: neededReaches - freeReaches,
    });
    modifiers[paradoxFromReaches.id] = paradoxFromReaches;
  }

  let paradoxDice = 0;
  let paradoxDiceType = DiceRollAgainType.tenAgain;
  let didAddPositiveParadoxDice = false;

  for (let key in modifiers) {
    const modifier = modifiers[key];
    const paradoxModifier = toParadoxModifier(modifier);

    if (paradoxModifier) {
      if (paradoxModifier.paradoxModifier > 0) {
        didAddPositiveParadoxDice = true;
      }
      paradoxDice += paradoxModifier.paradoxModifier;
      paradoxDiceType = bestRollAgainType(
        paradoxDiceType,
        paradoxModifier.rollAgainType,
      );
    }
  }

  if (paradoxDice <= 0 && didAddPositiveParadoxDice === false) {
    paradoxDice = 0;
  } else if (paradoxDice <= 0 && didAddPositiveParadoxDice === true) {
    paradoxDice = 1;
  }

  return {
    modifiers: modifiers as SpellModifiersFromSpellConfigResult['modifiers'],
    roll: {
      dices: {
        number: numberOfDices,
        type: DiceRollAgainType.tenAgain,
      },
      paradox: {
        number: paradoxDice,
        type: paradoxDiceType,
      },
    },
    reaches: {
      needed: neededReaches,
      free: freeReaches,
    },
    mana: neededMana,
  };
}
