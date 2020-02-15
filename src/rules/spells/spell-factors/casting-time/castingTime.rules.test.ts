import {gnosisRules} from '../../../gnosis/gnosisRules';
import {makeCastingTimeRules} from './castingTime.rules';

test('creates right number of spellfactor levels', () => {
  const theGnosisRules = gnosisRules;

  const castingRules = makeCastingTimeRules(theGnosisRules, 5);

  expect(castingRules.standard.length).toBe(6);
  expect(castingRules.advanced.length).toBe(1);
});

test('calculates the right dice modifiers', () => {
  const theGnosisRules = gnosisRules;
  const castingRules = makeCastingTimeRules(theGnosisRules, 5);

  expect(castingRules.standard.length).toBe(6);
  expect(castingRules.standard[0].value).toBe(0);
  expect(castingRules.standard[1].value).toBe(1);
  expect(castingRules.standard[2].value).toBe(2);
  expect(castingRules.standard[3].value).toBe(3);
  expect(castingRules.standard[4].value).toBe(4);
  expect(castingRules.standard[5].value).toBe(5);

  expect(castingRules.advanced[0].value).toBe(0);

  expect(castingRules.advanced.length).toBe(1);
});

test('calculates the correct description', () => {
  const theGnosisRules = gnosisRules;
  let castingRules = makeCastingTimeRules(theGnosisRules, 0);

  expect(castingRules.standard.length).toBe(6);
  expect(castingRules.standard[0].description).toEqual('3 hours (+0 dice)');
  expect(castingRules.standard[1].description).toEqual('6 hours (+1 dice)');
  expect(castingRules.standard[2].description).toEqual('9 hours (+2 dice)');
  expect(castingRules.standard[3].description).toEqual('12 hours (+3 dice)');
  expect(castingRules.standard[4].description).toEqual('15 hours (+4 dice)');
  expect(castingRules.standard[5].description).toEqual('18 hours (+5 dice)');

  expect(castingRules.advanced[0].description).toEqual('Quick casting');

  expect(castingRules.advanced.length).toBe(1);

  castingRules = makeCastingTimeRules(theGnosisRules, 2);
  expect(castingRules.standard[0].description).toEqual('1 hour (+0 dice)');
  expect(castingRules.standard[1].description).toEqual('2 hours (+1 dice)');
  expect(castingRules.standard[2].description).toEqual('3 hours (+2 dice)');
  expect(castingRules.standard[3].description).toEqual('4 hours (+3 dice)');
  expect(castingRules.standard[4].description).toEqual('5 hours (+4 dice)');
  expect(castingRules.standard[5].description).toEqual('6 hours (+5 dice)');

  castingRules = makeCastingTimeRules(theGnosisRules, 5);
  expect(castingRules.standard[0].description).toEqual('30 minutes (+0 dice)');
  expect(castingRules.standard[1].description).toEqual('60 minutes (+1 dice)');
  expect(castingRules.standard[2].description).toEqual('90 minutes (+2 dice)');
  expect(castingRules.standard[3].description).toEqual('120 minutes (+3 dice)');
  expect(castingRules.standard[4].description).toEqual('150 minutes (+4 dice)');
  expect(castingRules.standard[5].description).toEqual('180 minutes (+5 dice)');

  castingRules = makeCastingTimeRules(theGnosisRules, 7);
  expect(castingRules.standard[0].description).toEqual('10 minutes (+0 dice)');
  expect(castingRules.standard[1].description).toEqual('20 minutes (+1 dice)');
  expect(castingRules.standard[2].description).toEqual('30 minutes (+2 dice)');
  expect(castingRules.standard[3].description).toEqual('40 minutes (+3 dice)');
  expect(castingRules.standard[4].description).toEqual('50 minutes (+4 dice)');
  expect(castingRules.standard[5].description).toEqual('60 minutes (+5 dice)');

  castingRules = makeCastingTimeRules(theGnosisRules, 9);
  expect(castingRules.standard[0].description).toEqual('1 minute (+0 dice)');
  expect(castingRules.standard[1].description).toEqual('2 minutes (+1 dice)');
  expect(castingRules.standard[2].description).toEqual('3 minutes (+2 dice)');
  expect(castingRules.standard[3].description).toEqual('4 minutes (+3 dice)');
  expect(castingRules.standard[4].description).toEqual('5 minutes (+4 dice)');
  expect(castingRules.standard[5].description).toEqual('6 minutes (+5 dice)');
});
