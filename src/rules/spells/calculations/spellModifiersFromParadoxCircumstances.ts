import {ParadoxCircumstances} from '../paradox/ParadoxCircumstances';
import {
  makeInuredToSpellValue,
  InuredToSpellValue,
} from '../spell-values/InuredToSpellValue';
import {
  makeNumberOfPreviousParadoxRollsValue,
  NumberOfPreviousParadoxRollsValue,
} from '../spell-values/NumberOfPreviousParadoxRollsValue';
import {
  makeAdditionalManaSpendForReducingParadoxValue,
  AdditionalManaSpendForReducingParadoxValue,
} from '../spell-values/AdditionalManaSpendForReducingParadoxValue';
import {
  makeAdditionalParadoxDicesValue,
  AdditionalParadoxDicesValue,
} from '../spell-values/AdditionalParadoxDicesValue';
import {SleeperWitnesses} from '../paradox/SleeperWitnesses';
import {DiceRollAgainType} from '../../dice-roll/DiceRollAgainType';
import {
  makeSleeperWitnessesValue,
  SleeperWitnessesValue,
} from '../spell-values/SleeperWitnessesValue';
import {SpellValueIds} from '../spell-values/SpellValueIds';

export type SpellModifiersFromParadoxCircumstances = {
  [SpellValueIds.inuredToSpell]?: InuredToSpellValue;
  [SpellValueIds.numberOfPreviousParadoxRolls]?: NumberOfPreviousParadoxRollsValue;
  [SpellValueIds.additionalManaSpendForReducingParadox]?: AdditionalManaSpendForReducingParadoxValue;
  [SpellValueIds.additionalParadoxDices]?: AdditionalParadoxDicesValue;
  [SpellValueIds.sleeperWitnesses]?: SleeperWitnessesValue;
};

export function spellModifiersFromParadoxCircumstances(
  circumstances: ParadoxCircumstances,
): SpellModifiersFromParadoxCircumstances {
  let modifiers: SpellModifiersFromParadoxCircumstances = {};

  if (circumstances.inuredToSpell) {
    const inuredToSpell = makeInuredToSpellValue({paradoxModifier: 2});
    modifiers[inuredToSpell.id] = inuredToSpell;
  }

  if (circumstances.previousParadoxRolls) {
    const previousRolls = makeNumberOfPreviousParadoxRollsValue({
      paradoxModifier: circumstances.previousParadoxRolls,
    });
    modifiers[previousRolls.id] = previousRolls;
  }

  if (circumstances.manaSpent) {
    const manaSpend = makeAdditionalManaSpendForReducingParadoxValue({
      manaModifier: circumstances.manaSpent,
      paradoxModifier: circumstances.manaSpent * -1,
    });
    modifiers[manaSpend.id] = manaSpend;
  }

  if (circumstances.additionalParadoxDice) {
    const additionalParadoxDice = makeAdditionalParadoxDicesValue({
      paradoxModifier: circumstances.additionalParadoxDice,
    });
    modifiers[additionalParadoxDice.id] = additionalParadoxDice;
  }

  if (circumstances.sleeperWitnesses !== SleeperWitnesses.none) {
    let rollAgainType: DiceRollAgainType;
    let roteQuality: boolean = false;
    switch (circumstances.sleeperWitnesses) {
      case SleeperWitnesses.few:
        rollAgainType = DiceRollAgainType.nineAgain;
        break;
      case SleeperWitnesses.largeGroup:
        rollAgainType = DiceRollAgainType.eightAgain;
        break;
      case SleeperWitnesses.fullCrowd:
        rollAgainType = DiceRollAgainType.none;
        roteQuality = true;
        break;
      default:
        rollAgainType = DiceRollAgainType.tenAgain;
    }
    const sleeperWitnesses = makeSleeperWitnessesValue({
      paradoxModifier: 1,
      rollAgainType: rollAgainType,
      roteQuality,
    });
    modifiers[sleeperWitnesses.id] = sleeperWitnesses;
  }

  return modifiers;
}
