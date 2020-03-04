import {Spell} from '../Spell';
import {DiceRoll} from '../../dice-roll/DiceRoll';
import {makeDiceRollConfig} from '../../../features/roll-dice/helper/makeDiceRollConfig';
import {rollDice} from '../../dice-roll/rollDice';
import {SpellRollConfiguration} from './SpellRollConfiguration';
import {ParadoxResolution} from '../paradox/ParadoxResolution';
import {DiceRollAgainType} from '../../dice-roll/DiceRollAgainType';

export type RollForSpellResult = {
  spell: Spell;
  containParadoxRoll: DiceRoll | undefined;
  releasedParadox: number;
  unContainedParadox: number;
  paradoxRoll: DiceRoll | undefined;
  spellRoll: DiceRoll | undefined;
};

export function rollForSpell(
  spell: Spell,
  spellRollConfig: SpellRollConfiguration,
): RollForSpellResult {
  let paradoxRoll: DiceRoll | undefined;
  let containParadoxRoll: DiceRoll | undefined;
  let spellRoll: DiceRoll | undefined;
  let successesOnParadox = spellRollConfig.successesOnParadoxRoll;
  let unContainedParadox = 0;

  const paradox = spell.roll.paradox;

  if (spellRollConfig.rollParadox && paradox.number > 0) {
    const paradoxRollConfig = makeDiceRollConfig(
      paradox.number,
      paradox.type,
      paradox.successesForExceptionalSuccess,
      'Rolled ' +
        paradox.number +
        ' paradox dice for "' +
        spell.config.title +
        '"',
    );
    paradoxRoll = rollDice(paradoxRollConfig);
    successesOnParadox = paradoxRoll.successes;
  }

  if (
    successesOnParadox > 0 &&
    spellRollConfig.rollWisdomToContainParadox &&
    spellRollConfig.paradoxResolution === ParadoxResolution.contain
  ) {
    const containParadoxRollConfig = makeDiceRollConfig(
      spell.config.caster.wisdom.diceModifier,
      DiceRollAgainType.tenAgain,
      5,
      'Contain paradox for "' + spell.config.title + '"',
    );
    containParadoxRoll = rollDice(containParadoxRollConfig);
    if (successesOnParadox - containParadoxRoll.successes > 0) {
      unContainedParadox = successesOnParadox - containParadoxRoll.successes;
    }
  }

  const paradoxMalus =
    spellRollConfig.paradoxResolution === ParadoxResolution.release
      ? successesOnParadox
      : 0;

  const releasedParadox =
    spellRollConfig.paradoxResolution === ParadoxResolution.release
      ? successesOnParadox
      : 0;

  const dice = spell.roll.dices.number - paradoxMalus;

  if (dice > 0) {
    const spellDiceRollConfig = makeDiceRollConfig(
      dice,
      spell.roll.dices.type,
      spell.roll.dices.successesForExceptionalSuccess,
      'Rolled ' + dice + ' spell dice for "' + spell.config.title + '"',
    );
    spellRoll = rollDice(spellDiceRollConfig);
  }

  return {
    spell,
    paradoxRoll,
    containParadoxRoll,
    releasedParadox,
    unContainedParadox,
    spellRoll,
  };
}
