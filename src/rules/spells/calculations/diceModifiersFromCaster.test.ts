import {makeDefaultSpellCaster} from '../Spell.config';
import {diceModifiersFromCaster, DefaultKeys} from './diceModifiersFromCaster';
import {ArcanaType} from '../ArcanaType';

test('sets correct gnosis value', () => {
  let caster = makeDefaultSpellCaster();
  caster.gnosis = 5;
  const result = diceModifiersFromCaster(caster, false);
  expect(result[DefaultKeys.gnosis]).toBe(5);
});

test('sets correct arkanum value', () => {
  let caster = makeDefaultSpellCaster();

  caster.highestSpellArcanum.type = ArcanaType.life;
  caster.highestSpellArcanum.value = 3;

  const result = diceModifiersFromCaster(caster, false);
  expect(result[ArcanaType.life]).toBe(3);
});

test('sets correct rote skill value if spell is a rote', () => {
  let caster = makeDefaultSpellCaster();

  const name = 'Empathy';

  caster.roteSkill.name = name;
  caster.roteSkill.value = 4;

  const result = diceModifiersFromCaster(caster, true);
  expect(result[name]).toBe(4);
});

test('ignores rote skill value if spell is not a rote', () => {
  let caster = makeDefaultSpellCaster();

  const name = 'Empathy';

  caster.roteSkill.name = name;
  caster.roteSkill.value = 4;

  const result = diceModifiersFromCaster(caster, false);
  expect(result[name]).toBeUndefined();
});

test('sets correct willpower value if caster uses willpower ', () => {
  let caster = makeDefaultSpellCaster();

  caster.spendsWillpower = true;

  const result = diceModifiersFromCaster(caster, true);
  expect(result[DefaultKeys.willpower]).toBe(3);
});

test('sets no willpower value if caster does not spend willpower', () => {
  let caster = makeDefaultSpellCaster();

  caster.spendsWillpower = false;

  const result = diceModifiersFromCaster(caster, true);
  expect(result[DefaultKeys.willpower]).toBeUndefined();
});

test('overwriting a modifier with a rote skill is impossible', () => {
  let caster = makeDefaultSpellCaster();
  caster.gnosis = 2;

  const name = DefaultKeys.gnosis;
  caster.roteSkill.name = name;
  caster.roteSkill.value = 4;

  const result = diceModifiersFromCaster(caster, false);
  expect(result[DefaultKeys.gnosis]).toBe(2);
});

test('sets additional dices correct', () => {
  let caster = makeDefaultSpellCaster();

  const name1 = 'Luck';
  const value1 = 3;

  const name2 = 'Demons';
  const value2 = 4;

  caster.additionalSpellCastingDice = {[name1]: value1, [name2]: value2};

  const result = diceModifiersFromCaster(caster, false);

  expect(result[name1]).toBe(3);
  expect(result[name2]).toBe(4);
});

test('overwriting a modifier with a additionalSpellCastingDice is impossible', () => {
  let caster = makeDefaultSpellCaster();
  caster.gnosis = 2;

  const name = DefaultKeys.gnosis;
  const value = 3;

  caster.additionalSpellCastingDice = {[name]: value};

  const result = diceModifiersFromCaster(caster, false);
  expect(result[DefaultKeys.gnosis]).toBe(2);
});
