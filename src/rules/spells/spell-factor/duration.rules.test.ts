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

  expect(rules.standard[0].dicePenalty).toBe(-0);
  expect(rules.standard[1].dicePenalty).toBe(-2);
  expect(rules.standard[2].dicePenalty).toBe(-4);
  expect(rules.standard[3].dicePenalty).toBe(-6);
  expect(rules.standard[4].dicePenalty).toBe(-8);

  expect(rules.advanced[0].dicePenalty).toBe(-0);
  expect(rules.advanced[1].dicePenalty).toBe(-2);
  expect(rules.advanced[2].dicePenalty).toBe(-4);
  expect(rules.advanced[3].dicePenalty).toBe(-6);
  expect(rules.advanced[4].dicePenalty).toBe(-8);
  expect(rules.advanced[5].dicePenalty).toBe(-10);
});
