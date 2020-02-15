import {makeDurationRules} from './duration.rules';

test('that a correct number of rules is calculated', () => {
  const rules = makeDurationRules(() => '');
  expect(rules.standard.length).toBe(5);
  expect(rules.advanced.length).toBe(6);
});

test('that a correct dice penalty is calculated', () => {
  const rules = makeDurationRules(() => '');

  expect(rules.standard.length).toBe(5);
  expect(rules.advanced.length).toBe(6);

  expect(rules.standard[0].value).toBe(-0);
  expect(rules.standard[1].value).toBe(-2);
  expect(rules.standard[2].value).toBe(-4);
  expect(rules.standard[3].value).toBe(-6);
  expect(rules.standard[4].value).toBe(-8);

  expect(rules.advanced[0].value).toBe(-0);
  expect(rules.advanced[1].value).toBe(-2);
  expect(rules.advanced[2].value).toBe(-4);
  expect(rules.advanced[3].value).toBe(-6);
  expect(rules.advanced[4].value).toBe(-8);
  expect(rules.advanced[5].value).toBe(-10);
});
