import {makeScaleRules} from './scale.rules';

test('that a correct number of rules is calculated', () => {
  const rules = makeScaleRules(7, () => '');
  expect(rules.standard.length).toBe(5);
  expect(rules.advanced.length).toBe(7);
});

test('that a correct dice penalty is calculated', () => {
  const rules = makeScaleRules(7, () => '');

  expect(rules.standard.length).toBe(5);
  expect(rules.advanced.length).toBe(7);

  expect(rules.standard[0].value).toBe(0);
  expect(rules.standard[1].value).toBe(-2);
  expect(rules.standard[2].value).toBe(-4);
  expect(rules.standard[3].value).toBe(-6);
  expect(rules.standard[4].value).toBe(-8);

  expect(rules.advanced[0].value).toBe(0);
  expect(rules.advanced[1].value).toBe(-2);
  expect(rules.advanced[2].value).toBe(-4);
  expect(rules.advanced[3].value).toBe(-6);
  expect(rules.advanced[4].value).toBe(-8);
  expect(rules.advanced[5].value).toBe(-10);
  expect(rules.advanced[6].value).toBe(-12);
});

test('that a correct description is calculated', () => {
  const rules = makeScaleRules(7, (level, value) => level + '_' + value);

  expect(rules.standard.length).toBe(5);
  expect(rules.advanced.length).toBe(7);

  expect(rules.standard[0].description).toEqual('standard_0');
  expect(rules.standard[1].description).toEqual('standard_1');
  expect(rules.standard[2].description).toEqual('standard_2');
  expect(rules.standard[3].description).toEqual('standard_3');
  expect(rules.standard[4].description).toEqual('standard_4');

  expect(rules.advanced[0].description).toEqual('advanced_0');
  expect(rules.advanced[1].description).toEqual('advanced_1');
  expect(rules.advanced[2].description).toEqual('advanced_2');
  expect(rules.advanced[3].description).toEqual('advanced_3');
  expect(rules.advanced[4].description).toEqual('advanced_4');
  expect(rules.advanced[5].description).toEqual('advanced_5');
  expect(rules.advanced[6].description).toEqual('advanced_6');
});

test('that a correct subject number is calculated', () => {
  const rules = makeScaleRules(7, (level, value) => level + '_' + value);

  expect(rules.standard.length).toBe(5);
  expect(rules.advanced.length).toBe(7);

  expect(rules.standard[0].numberOfSubjects).toBe(1);
  expect(rules.standard[1].numberOfSubjects).toBe(2);
  expect(rules.standard[2].numberOfSubjects).toBe(4);
  expect(rules.standard[3].numberOfSubjects).toBe(8);
  expect(rules.standard[4].numberOfSubjects).toBe(16);

  expect(rules.advanced[0].numberOfSubjects).toBe(5);
  expect(rules.advanced[1].numberOfSubjects).toBe(10);
  expect(rules.advanced[2].numberOfSubjects).toBe(20);
  expect(rules.advanced[3].numberOfSubjects).toBe(40);
  expect(rules.advanced[4].numberOfSubjects).toBe(80);
  expect(rules.advanced[5].numberOfSubjects).toBe(160);
  expect(rules.advanced[6].numberOfSubjects).toBe(320);
});

test('that a correct max size is calculated', () => {
  const rules = makeScaleRules(7, (level, value) => level + '_' + value);

  expect(rules.standard.length).toBe(5);
  expect(rules.advanced.length).toBe(7);

  expect(rules.standard[0].sizeOfLargestSubject).toBe(5);
  expect(rules.standard[1].sizeOfLargestSubject).toBe(6);
  expect(rules.standard[2].sizeOfLargestSubject).toBe(7);
  expect(rules.standard[3].sizeOfLargestSubject).toBe(8);
  expect(rules.standard[4].sizeOfLargestSubject).toBe(9);

  expect(rules.advanced[0].sizeOfLargestSubject).toBe(5);
  expect(rules.advanced[1].sizeOfLargestSubject).toBe(10);
  expect(rules.advanced[2].sizeOfLargestSubject).toBe(15);
  expect(rules.advanced[3].sizeOfLargestSubject).toBe(20);
  expect(rules.advanced[4].sizeOfLargestSubject).toBe(25);
  expect(rules.advanced[5].sizeOfLargestSubject).toBe(30);
  expect(rules.advanced[6].sizeOfLargestSubject).toBe(35);
});
