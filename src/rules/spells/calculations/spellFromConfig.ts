import {SpellCastingConfig} from '../Spell.config';
import {spellModifiersFromCaster} from './spellModifiersFromCaster';
import {spellModifiersFromSpecification} from './spellModifiersFromSpecification';
import StringMap from '../../../data-types/StringMap';
import {BaseDiceModifier, toDiceModifier} from '../../model/BaseDiceModifier';
import {
  BaseReachModifier,
  toReachModifier,
} from '../../model/BaseReachModifier';
import {BaseManaModifier, toManaModifier} from '../../model/BaseManaModifier';
import {spellModifiersFromParadoxCircumstances} from './spellModifiersFromParadoxCircumstances';
import {
  BaseParadoxModifier,
  toParadoxModifier,
} from '../../model/BaseParadoxModifier';
import {
  DiceRollAgainType,
  bestRollAgainType,
} from '../../dice-roll/DiceRollAgainType';
import {makeParadoxDiceFromReachValue} from '../spell-values/ParadoxDiceFromReachValue';
import {SpellType} from '../Spell.type';
import {gnosisRules as defaultGnosisRules} from '../../gnosis/gnosisRules';
import {Spell} from '../Spell';
import {GnosisRules} from '../../gnosis/GnosisRule';
import {GameValueType} from '../../../GameValueTypes';
import {min} from 'lodash';

export function spellFromConfig(
  config: SpellCastingConfig,
  gnosisRules: GnosisRules[] = defaultGnosisRules,
): Spell {
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

  let negativeModifiers: BaseDiceModifier[] = [];
  let yantraModifiers: BaseDiceModifier[] = [];
  let otherPositiveModifiers: BaseDiceModifier[] = [];

  let yantraDice = 0;
  let negativeDice = 0;
  let otherPositiveDice = 0;

  //calculate dices, mana and reach for this config
  for (let key in modifiers) {
    const modifier = modifiers[key];

    const diceModifier = toDiceModifier(modifier);
    if (diceModifier) {
      if (diceModifier.type === GameValueType.yantra) {
        yantraModifiers.push(diceModifier);
        yantraDice += diceModifier.diceModifier;
      } else if (diceModifier.diceModifier > 0) {
        otherPositiveModifiers.push(diceModifier);
        otherPositiveDice += diceModifier.diceModifier;
      } else if (diceModifier.diceModifier < -0) {
        negativeModifiers.push(diceModifier);
        negativeDice += diceModifier.diceModifier;
      }
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

  //yantras can add only 5 dice after substracting all negative dice
  let correctedYantraDice = min([yantraDice + negativeDice, 5]) as number;

  numberOfDices = correctedYantraDice + otherPositiveDice;
  if (numberOfDices < 0) {
    numberOfDices = 0;
  }

  const freeReaches =
    config.spell.type === SpellType.rote
      ? 5 - config.spell.requiredArcanumValue + 1
      : config.caster.highestSpellArcanum.diceModifier -
        config.spell.requiredArcanumValue +
        1;

  //calculate paradox for this config
  if (neededReaches - freeReaches > 0) {
    const paradoxFromReaches = makeParadoxDiceFromReachValue({
      paradoxModifier:
        (neededReaches - freeReaches) *
        gnosisRules[config.caster.gnosis.diceModifier - 1].paradoxCreated,
    });
    modifiers[paradoxFromReaches.id] = paradoxFromReaches;
  }

  let paradoxDice = 0;
  let paradoxDiceType = DiceRollAgainType.tenAgain;
  let didAddPositiveParadoxDice = false;
  let paradoxRoteQualty = false;

  for (let key in modifiers) {
    const modifier = modifiers[key];
    const paradoxModifier = toParadoxModifier(modifier);

    if (paradoxModifier) {
      if (paradoxModifier.paradoxModifier > 0) {
        didAddPositiveParadoxDice = true;
      }
      if (paradoxModifier.roteQuality) {
        paradoxRoteQualty = true;
      }
      paradoxDice += paradoxModifier.paradoxModifier;
      paradoxDiceType = bestRollAgainType(
        paradoxDiceType,
        paradoxModifier.rollAgainType,
      );
    }
  }

  let paradoxOneAsChanceDice = false;
  if (paradoxDice <= 0 && didAddPositiveParadoxDice === false) {
    paradoxDice = 0;
  } else if (paradoxDice <= 0 && didAddPositiveParadoxDice === true) {
    paradoxDice = 1;
    paradoxOneAsChanceDice = true;
  }

  const rollSuccessesForExceptionalSuccess =
    config.spell.type === SpellType.praxis ? 3 : 5;

  const gnosis = config.caster.gnosis.diceModifier;
  const yantrasMax = gnosis === 0 ? 0 : gnosisRules[gnosis - 1].yantrasMax;
  const diceRollAgainType = config.spell.rollAgainType;

  return {
    config: config,
    modifiers: modifiers as Spell['modifiers'],
    roll: {
      dices: {
        number: numberOfDices,
        type: diceRollAgainType,
        successesForExceptionalSuccess: rollSuccessesForExceptionalSuccess,
        oneAsChanceDice: false,
        roteQuality: config.spell.roteQuality,
      },
      paradox: {
        number: paradoxDice,
        type: paradoxDiceType,
        successesForExceptionalSuccess: 5,
        oneAsChanceDice: paradoxOneAsChanceDice,
        roteQuality: paradoxRoteQualty,
      },
    },
    reaches: {
      needed: neededReaches,
      free: freeReaches,
    },
    mana: neededMana,
    maxYantras: yantrasMax,
  };
}
