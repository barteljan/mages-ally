import {makeParadoxCircumstances} from '../paradox/ParadoxCircumstances';
import {spellModifiersFromParadoxCircumstances} from './spellModifiersFromParadoxCircumstances';
import {SleeperWitnesses} from '../paradox/SleeperWitnesses';
import {DiceRollAgainType} from '../../dice-roll/DiceRollAgainType';

test('no paradox dices per default', () => {
  const paradox = makeParadoxCircumstances();

  const modifiers = spellModifiersFromParadoxCircumstances(paradox);

  let dices = 0;
  for (let key in modifiers) {
    //@ts-ignore
    let mod: any = modifiers[key];
    if (mod && mod.paradoxModifier) {
      dices += mod.paradoxModifier;
    }
  }

  expect(dices).toBe(0);
});

test('inuredToSpell is added correctly', () => {
  const paradox = makeParadoxCircumstances({
    inuredToSpell: true,
  });

  const modifiers = spellModifiersFromParadoxCircumstances(paradox);

  expect(modifiers.inuredToSpell).toBeDefined();
  expect(modifiers.inuredToSpell!.paradoxModifier).toBe(2);
});

test('previousParadoxRolls is added correctly', () => {
  const paradox = makeParadoxCircumstances({
    previousParadoxRolls: 14,
  });

  const modifiers = spellModifiersFromParadoxCircumstances(paradox);

  expect(modifiers.numberOfPreviousParadoxRolls).toBeDefined();
  expect(modifiers.numberOfPreviousParadoxRolls!.paradoxModifier).toBe(14);
});

test('manaSpent is added correctly', () => {
  const paradox = makeParadoxCircumstances({
    manaSpent: 12,
  });

  const modifiers = spellModifiersFromParadoxCircumstances(paradox);

  expect(modifiers.additionalManaSpendForReducingParadox).toBeDefined();
  expect(modifiers.additionalManaSpendForReducingParadox!.paradoxModifier).toBe(
    -12,
  );
  expect(modifiers.additionalManaSpendForReducingParadox!.manaModifier).toBe(
    12,
  );
});

test('additionalParadoxDice is added correctly', () => {
  const paradox = makeParadoxCircumstances({
    additionalParadoxDice: 42,
  });

  const modifiers = spellModifiersFromParadoxCircumstances(paradox);

  expect(modifiers.additionalParadoxDices).toBeDefined();
  expect(modifiers.additionalParadoxDices!.paradoxModifier).toBe(42);
});

test('sleeperWitnesses is added for witnesses = none', () => {
  const paradox = makeParadoxCircumstances({
    sleeperWitnesses: SleeperWitnesses.none,
  });

  const modifiers = spellModifiersFromParadoxCircumstances(paradox);

  expect(modifiers.sleeperWitnesses).toBeUndefined();
});

test('sleeperWitnesses is added for witnesses = one', () => {
  const paradox = makeParadoxCircumstances({
    sleeperWitnesses: SleeperWitnesses.one,
  });

  const modifiers = spellModifiersFromParadoxCircumstances(paradox);

  expect(modifiers.sleeperWitnesses).toBeDefined();
  expect(modifiers.sleeperWitnesses!.paradoxModifier).toBe(1);
  expect(modifiers.sleeperWitnesses!.rollAgainType).toBe(
    DiceRollAgainType.tenAgain,
  );
});

test('sleeperWitnesses is added for witnesses = few', () => {
  const paradox = makeParadoxCircumstances({
    sleeperWitnesses: SleeperWitnesses.few,
  });

  const modifiers = spellModifiersFromParadoxCircumstances(paradox);

  expect(modifiers.sleeperWitnesses).toBeDefined();
  expect(modifiers.sleeperWitnesses!.paradoxModifier).toBe(1);
  expect(modifiers.sleeperWitnesses!.rollAgainType).toBe(
    DiceRollAgainType.nineAgain,
  );
});

test('sleeperWitnesses is added for witnesses = largeGroup', () => {
  const paradox = makeParadoxCircumstances({
    sleeperWitnesses: SleeperWitnesses.largeGroup,
  });

  const modifiers = spellModifiersFromParadoxCircumstances(paradox);

  expect(modifiers.sleeperWitnesses).toBeDefined();
  expect(modifiers.sleeperWitnesses!.paradoxModifier).toBe(1);
  expect(modifiers.sleeperWitnesses!.rollAgainType).toBe(
    DiceRollAgainType.eightAgain,
  );
});

test('sleeperWitnesses is added for witnesses = fullCrowd', () => {
  const paradox = makeParadoxCircumstances({
    sleeperWitnesses: SleeperWitnesses.fullCrowd,
  });

  const modifiers = spellModifiersFromParadoxCircumstances(paradox);

  expect(modifiers.sleeperWitnesses).toBeDefined();
  expect(modifiers.sleeperWitnesses!.paradoxModifier).toBe(1);
  expect(modifiers.sleeperWitnesses!.rollAgainType).toBe(
    DiceRollAgainType.none,
  );
  expect(modifiers.sleeperWitnesses!.roteQuality).toBe(true);
});
