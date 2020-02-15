import {makeDefaultSpellCaster} from '../Spell.config';
import {diceModifiersFromCaster} from './diceModifiersFromCaster';
import {DefaultKeys} from './DefaultKeys';
import {ArcanaType} from '../ArcanaType';
import {makeGnosisValue} from '../../../rules/character/GnosisValue';
import {makeDiceModifier} from '../../../data-types/DiceModifier';

test('sets correct gnosis value', () => {
  let caster = makeDefaultSpellCaster();
  caster.gnosis = makeGnosisValue({value: 5});
  const result = diceModifiersFromCaster(caster, false);
  expect(result[DefaultKeys.gnosis].value).toBe(5);
});

test('sets correct arkanum value', () => {
  let caster = makeDefaultSpellCaster();

  caster.highestSpellArcanum.arcanumType = ArcanaType.life;
  caster.highestSpellArcanum.value = 3;

  const result = diceModifiersFromCaster(caster, false);
  expect(result[ArcanaType.life].value).toBe(3);
});

test('sets correct rote skill value if spell is a rote', () => {
  let caster = makeDefaultSpellCaster();

  const id = 'Empathy';

  caster.roteSkill.id = id;
  caster.roteSkill.value = 4;

  const result = diceModifiersFromCaster(caster, true);
  expect(result[id].value).toBe(4);
});

test('ignores rote skill value if spell is not a rote', () => {
  let caster = makeDefaultSpellCaster();

  const id = 'Empathy';

  caster.roteSkill.id = id;
  caster.roteSkill.value = 4;

  const result = diceModifiersFromCaster(caster, false);
  expect(result[id]).toBeUndefined();
});

test('sets correct willpower value if caster uses willpower ', () => {
  let caster = makeDefaultSpellCaster();

  caster.spendsWillpower = true;

  const result = diceModifiersFromCaster(caster, true);
  expect(result[DefaultKeys.willpower].value).toBe(3);
});

test('sets no willpower value if caster does not spend willpower', () => {
  let caster = makeDefaultSpellCaster();

  caster.spendsWillpower = false;

  const result = diceModifiersFromCaster(caster, true);
  expect(result[DefaultKeys.willpower]).toBeUndefined();
});

test('overwriting a modifier with a rote skill is impossible', () => {
  let caster = makeDefaultSpellCaster();
  caster.gnosis = makeGnosisValue({value: 2});

  const id = DefaultKeys.gnosis;
  caster.roteSkill.id = id;
  caster.roteSkill.value = 4;

  const result = diceModifiersFromCaster(caster, false);
  expect(result[DefaultKeys.gnosis].value).toBe(2);
});

test('sets additional dice correct', () => {
  let caster = makeDefaultSpellCaster();

  const id1 = 'Luck';
  const addDice1 = makeDiceModifier(id1, {
    value: 2,
  });

  const id2 = 'Demons';
  const addDice2 = makeDiceModifier(id2, {
    value: 4,
  });

  caster.additionalSpellCastingDice = {[id1]: addDice1, [id2]: addDice2};

  const result = diceModifiersFromCaster(caster, false);

  expect(result[id1]).toBe(addDice1);
  expect(result[id1].value).toBe(2);
  expect(result[id2].value).toBe(4);
});
