import {makeScaleRules} from './scale.rules';

test('that a correct number of rules is calculated', () => {
  const rules = makeScaleRules(7);
  expect(rules.standard.length).toBe(5);
  expect(rules.advanced.length).toBe(7);
});

test('that a correct dice penalty is calculated', () => {
  const rules = makeScaleRules(7);

  expect(rules.standard.length).toBe(5);
  expect(rules.advanced.length).toBe(7);

  expect(rules.standard[0].diceModifier).toBe(0);
  expect(rules.standard[1].diceModifier).toBe(-2);
  expect(rules.standard[2].diceModifier).toBe(-4);
  expect(rules.standard[3].diceModifier).toBe(-6);
  expect(rules.standard[4].diceModifier).toBe(-8);

  expect(rules.advanced[0].diceModifier).toBe(0);
  expect(rules.advanced[1].diceModifier).toBe(-2);
  expect(rules.advanced[2].diceModifier).toBe(-4);
  expect(rules.advanced[3].diceModifier).toBe(-6);
  expect(rules.advanced[4].diceModifier).toBe(-8);
  expect(rules.advanced[5].diceModifier).toBe(-10);
  expect(rules.advanced[6].diceModifier).toBe(-12);
});

test('that a correct subject number is calculated', () => {
  const rules = makeScaleRules(7);

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
  const rules = makeScaleRules(7);

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
