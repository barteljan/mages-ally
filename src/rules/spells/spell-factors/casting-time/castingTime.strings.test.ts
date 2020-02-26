import {gnosisRules} from '../../../gnosis/gnosisRules';
import {spellFactorLabelCastingTime} from './castingTime.strings';
import {SpellFactorLevel} from '../SpellFactor.level';

test('calculates the correct description', () => {
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 0, 1, gnosisRules),
  ).toEqual('3 hours (-0 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 1, 1, gnosisRules),
  ).toEqual('6 hours (+1 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 2, 1, gnosisRules),
  ).toEqual('9 hours (+2 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 3, 1, gnosisRules),
  ).toEqual('12 hours (+3 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 4, 1, gnosisRules),
  ).toEqual('15 hours (+4 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 5, 1, gnosisRules),
  ).toEqual('18 hours (+5 dice)');

  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.advanced, 0, 1, gnosisRules),
  ).toEqual('Quick casting');

  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 0, 3, gnosisRules),
  ).toEqual('1 hour (-0 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 1, 3, gnosisRules),
  ).toEqual('2 hours (+1 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 2, 3, gnosisRules),
  ).toEqual('3 hours (+2 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 3, 3, gnosisRules),
  ).toEqual('4 hours (+3 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 4, 3, gnosisRules),
  ).toEqual('5 hours (+4 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 5, 3, gnosisRules),
  ).toEqual('6 hours (+5 dice)');

  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 0, 6, gnosisRules),
  ).toEqual('30 minutes (-0 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 1, 6, gnosisRules),
  ).toEqual('60 minutes (+1 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 2, 6, gnosisRules),
  ).toEqual('90 minutes (+2 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 3, 6, gnosisRules),
  ).toEqual('120 minutes (+3 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 4, 6, gnosisRules),
  ).toEqual('150 minutes (+4 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 5, 6, gnosisRules),
  ).toEqual('180 minutes (+5 dice)');

  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 0, 8, gnosisRules),
  ).toEqual('10 minutes (-0 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 1, 8, gnosisRules),
  ).toEqual('20 minutes (+1 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 2, 8, gnosisRules),
  ).toEqual('30 minutes (+2 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 3, 8, gnosisRules),
  ).toEqual('40 minutes (+3 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 4, 8, gnosisRules),
  ).toEqual('50 minutes (+4 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 5, 8, gnosisRules),
  ).toEqual('60 minutes (+5 dice)');

  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 0, 10, gnosisRules),
  ).toEqual('1 minute (-0 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 1, 10, gnosisRules),
  ).toEqual('2 minutes (+1 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 2, 10, gnosisRules),
  ).toEqual('3 minutes (+2 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 3, 10, gnosisRules),
  ).toEqual('4 minutes (+3 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 4, 10, gnosisRules),
  ).toEqual('5 minutes (+4 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 5, 10, gnosisRules),
  ).toEqual('6 minutes (+5 dice)');
});
