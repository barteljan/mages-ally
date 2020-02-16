import {makeCastingTimeRules} from './castingTime.rules';

test('creates right number of spellfactor levels', () => {
  const castingRules = makeCastingTimeRules();

  expect(castingRules.standard.length).toBe(6);
  expect(castingRules.advanced.length).toBe(1);
});

test('calculates the right dice modifiers', () => {
  const castingRules = makeCastingTimeRules();

  expect(castingRules.standard.length).toBe(6);
  expect(castingRules.standard[0].diceModifier).toBe(0);
  expect(castingRules.standard[1].diceModifier).toBe(1);
  expect(castingRules.standard[2].diceModifier).toBe(2);
  expect(castingRules.standard[3].diceModifier).toBe(3);
  expect(castingRules.standard[4].diceModifier).toBe(4);
  expect(castingRules.standard[5].diceModifier).toBe(5);

  expect(castingRules.advanced[0].diceModifier).toBe(0);

  expect(castingRules.advanced.length).toBe(1);
});
