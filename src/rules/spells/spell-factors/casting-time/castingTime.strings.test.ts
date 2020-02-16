import {gnosisRules} from '../../../gnosis/gnosisRules';
import {spellFactorLabelCastingTime} from './castingTime.strings';
import {SpellFactorLevel} from '../SpellFactor.level';

test('calculates the correct description', () => {
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 0, 0, gnosisRules),
  ).toEqual('3 hours (+0 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 1, 0, gnosisRules),
  ).toEqual('6 hours (+1 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 2, 0, gnosisRules),
  ).toEqual('9 hours (+2 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 3, 0, gnosisRules),
  ).toEqual('12 hours (+3 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 4, 0, gnosisRules),
  ).toEqual('15 hours (+4 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 5, 0, gnosisRules),
  ).toEqual('18 hours (+5 dice)');

  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.advanced, 0, 0, gnosisRules),
  ).toEqual('Quick casting');

  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 0, 2, gnosisRules),
  ).toEqual('1 hour (+0 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 1, 2, gnosisRules),
  ).toEqual('2 hours (+1 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 2, 2, gnosisRules),
  ).toEqual('3 hours (+2 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 3, 2, gnosisRules),
  ).toEqual('4 hours (+3 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 4, 2, gnosisRules),
  ).toEqual('5 hours (+4 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 5, 2, gnosisRules),
  ).toEqual('6 hours (+5 dice)');

  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 0, 4, gnosisRules),
  ).toEqual('30 minutes (+0 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 1, 5, gnosisRules),
  ).toEqual('60 minutes (+1 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 2, 4, gnosisRules),
  ).toEqual('90 minutes (+2 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 3, 4, gnosisRules),
  ).toEqual('120 minutes (+3 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 4, 4, gnosisRules),
  ).toEqual('150 minutes (+4 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 5, 4, gnosisRules),
  ).toEqual('180 minutes (+5 dice)');

  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 0, 6, gnosisRules),
  ).toEqual('10 minutes (+0 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 1, 6, gnosisRules),
  ).toEqual('20 minutes (+1 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 2, 6, gnosisRules),
  ).toEqual('30 minutes (+2 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 3, 6, gnosisRules),
  ).toEqual('40 minutes (+3 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 4, 6, gnosisRules),
  ).toEqual('50 minutes (+4 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 5, 6, gnosisRules),
  ).toEqual('60 minutes (+5 dice)');

  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 0, 8, gnosisRules),
  ).toEqual('1 minute (+0 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 1, 8, gnosisRules),
  ).toEqual('2 minutes (+1 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 2, 8, gnosisRules),
  ).toEqual('3 minutes (+2 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 3, 8, gnosisRules),
  ).toEqual('4 minutes (+3 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 4, 8, gnosisRules),
  ).toEqual('5 minutes (+4 dice)');
  expect(
    spellFactorLabelCastingTime(SpellFactorLevel.standard, 5, 8, gnosisRules),
  ).toEqual('6 minutes (+5 dice)');
});
