import {spellModifiersFromCaster} from './spellModifiersFromCaster';
import {ArcanaType} from '../arcana/Arcana.type';
import {makeGnosisValue} from '../../character/GnosisValue';
import {makeDiceModifier} from '../../../data-types/BaseDiceModifier';
import {CharacterValueId} from '../../character/CharacterValue.id';
import {DefaultKeys} from './DefaultKeys';
import {makeDefaultSpellCaster} from '../Spell.config.caster';

test('sets correct gnosis value', () => {
  let caster = makeDefaultSpellCaster();
  caster.gnosis = makeGnosisValue({diceModifier: 5});
  const result = spellModifiersFromCaster(caster, false);
  expect(result[CharacterValueId.gnosis].diceModifier).toBe(5);
});

test('sets correct arkanum value', () => {
  let caster = makeDefaultSpellCaster();

  caster.highestSpellArcanum.arcanumType = ArcanaType.life;
  caster.highestSpellArcanum.diceModifier = 3;

  const result = spellModifiersFromCaster(caster, false);

  expect(result.highestArcanum).toBeDefined();
  expect(result.highestArcanum!.diceModifier).toBe(3);
});

test('sets correct rote skill value if spell is a rote', () => {
  let caster = makeDefaultSpellCaster();

  const id = 'Empathy';

  caster.roteSkill.id = id;
  caster.roteSkill.diceModifier = 4;

  const result = spellModifiersFromCaster(caster, true);
  expect(result.roteSkill).toBeDefined();
  expect(result.roteSkill!.diceModifier).toBe(4);
});

test('ignores rote skill value if spell is not a rote', () => {
  let caster = makeDefaultSpellCaster();

  const id = 'Empathy';

  caster.roteSkill.id = id;
  caster.roteSkill.diceModifier = 4;

  const result = spellModifiersFromCaster(caster, false);
  expect(result[id]).toBeUndefined();
});

test('sets correct willpower value if caster uses willpower ', () => {
  let caster = makeDefaultSpellCaster();

  caster.spendsWillpower = true;

  const result = spellModifiersFromCaster(caster, true);
  expect(result.willpower).toBeDefined();
  expect(result.willpower!.diceModifier).toBe(3);
});

test('sets no willpower value if caster does not spend willpower', () => {
  let caster = makeDefaultSpellCaster();

  caster.spendsWillpower = false;

  const result = spellModifiersFromCaster(caster, true);
  expect(result[CharacterValueId.willpower]).toBeUndefined();
});

test('sets additional dice correct', () => {
  let caster = makeDefaultSpellCaster();

  const id1 = 'Luck';
  const addDice1 = makeDiceModifier('Luck', {
    diceModifier: 2,
  });

  const id2 = 'Demons';
  const addDice2 = makeDiceModifier('Demons', {
    diceModifier: 4,
  });

  caster.additionalSpellCastingDice = {[id1]: addDice1, [id2]: addDice2};

  const result = spellModifiersFromCaster(caster, false);

  expect(result[DefaultKeys.additionalDice + '0']).toBeDefined();
  expect(result[DefaultKeys.additionalDice + '0']!.diceModifier).toBe(2);
  expect(result[DefaultKeys.additionalDice + '1']).toBeDefined();
  expect(result[DefaultKeys.additionalDice + '1']!.diceModifier).toBe(4);
});
