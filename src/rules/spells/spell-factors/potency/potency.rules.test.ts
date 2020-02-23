import {makePotencyRules} from './potency.rules';
import {SpellFactorType} from '../SpellFactor.type';

test('that a correct number of rules is calculated', () => {
  const rules = makePotencyRules(12, SpellFactorType.duration, 5);
  expect(rules.standard.length).toBe(12);
  expect(rules.advanced.length).toBe(12);
});

test('that a correct dice penalty is calculated', () => {
  const rules = makePotencyRules(4, SpellFactorType.duration, 5);

  expect(rules.standard.length).toBe(4);
  expect(rules.advanced.length).toBe(4);

  expect(rules.standard[0].diceModifier).toBe(-0);
  expect(rules.standard[1].diceModifier).toBe(-2);
  expect(rules.standard[2].diceModifier).toBe(-4);
  expect(rules.standard[3].diceModifier).toBe(-6);

  expect(rules.advanced[0].diceModifier).toBe(-0);
  expect(rules.advanced[1].diceModifier).toBe(-2);
  expect(rules.advanced[2].diceModifier).toBe(-4);
  expect(rules.advanced[3].diceModifier).toBe(-6);
});

test('that a correct dice penalty is calculated with potence as primary factor', () => {
  let rules = makePotencyRules(6, SpellFactorType.potency, 1);

  expect(rules.standard.length).toBe(6);
  expect(rules.advanced.length).toBe(6);

  expect(rules.standard[0].diceModifier).toBe(0);
  expect(rules.standard[1].diceModifier).toBe(-2);
  expect(rules.standard[2].diceModifier).toBe(-4);
  expect(rules.standard[3].diceModifier).toBe(-6);
  expect(rules.standard[4].diceModifier).toBe(-8);
  expect(rules.standard[5].diceModifier).toBe(-10);

  expect(rules.advanced[0].diceModifier).toBe(0);
  expect(rules.advanced[1].diceModifier).toBe(-2);
  expect(rules.advanced[2].diceModifier).toBe(-4);
  expect(rules.advanced[3].diceModifier).toBe(-6);
  expect(rules.advanced[4].diceModifier).toBe(-8);
  expect(rules.advanced[5].diceModifier).toBe(-10);

  rules = makePotencyRules(6, SpellFactorType.potency, 2);

  expect(rules.standard[0].diceModifier).toBe(0);
  expect(rules.standard[1].diceModifier).toBe(0);
  expect(rules.standard[2].diceModifier).toBe(-2);
  expect(rules.standard[3].diceModifier).toBe(-4);
  expect(rules.standard[4].diceModifier).toBe(-6);
  expect(rules.standard[5].diceModifier).toBe(-8);

  expect(rules.advanced[0].diceModifier).toBe(0);
  expect(rules.advanced[1].diceModifier).toBe(0);
  expect(rules.advanced[2].diceModifier).toBe(-2);
  expect(rules.advanced[3].diceModifier).toBe(-4);
  expect(rules.advanced[4].diceModifier).toBe(-6);
  expect(rules.advanced[5].diceModifier).toBe(-8);

  rules = makePotencyRules(6, SpellFactorType.potency, 3);

  expect(rules.standard[0].diceModifier).toBe(0);
  expect(rules.standard[1].diceModifier).toBe(0);
  expect(rules.standard[2].diceModifier).toBe(0);
  expect(rules.standard[3].diceModifier).toBe(-2);
  expect(rules.standard[4].diceModifier).toBe(-4);
  expect(rules.standard[5].diceModifier).toBe(-6);

  expect(rules.advanced[0].diceModifier).toBe(0);
  expect(rules.advanced[1].diceModifier).toBe(0);
  expect(rules.advanced[2].diceModifier).toBe(0);
  expect(rules.advanced[3].diceModifier).toBe(-2);
  expect(rules.advanced[4].diceModifier).toBe(-4);
  expect(rules.advanced[5].diceModifier).toBe(-6);
});
