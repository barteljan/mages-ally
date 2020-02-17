import {spellModifiersFromCaster} from './spellModifiersFromCaster';
import {ArcanaType} from '../arcana/Arcana.type';
import {makeGnosisValue} from '../../character/GnosisValue';
import {makeDiceModifier, diceModifier} from '../../model/BaseDiceModifier';
import {CharacterValueId} from '../../character/CharacterValue.id';
import {SpellValueIds} from '../spell-values/SpellValueIds';
import {makeSpellCaster} from '../Spell.config.caster';
import {makeCharactersArcanum} from '../../character/CharactersArcanum';
import {SpellType} from '../Spell.type';

test('sets correct gnosis value', () => {
  let caster = makeSpellCaster();
  caster.gnosis = makeGnosisValue({diceModifier: 5});
  const result = spellModifiersFromCaster(caster, SpellType.improvised);
  expect(result[CharacterValueId.gnosis].diceModifier).toBe(5);
});

test('sets correct arkanum value', () => {
  let caster = makeSpellCaster();

  caster.highestSpellArcanum.arcanumType = ArcanaType.life;
  caster.highestSpellArcanum.diceModifier = 3;

  const result = spellModifiersFromCaster(caster, SpellType.improvised);

  expect(result.highestArcanum).toBeDefined();
  expect(result.highestArcanum!.diceModifier).toBe(3);
});

test('sets correct willpower value if caster uses willpower ', () => {
  let caster = makeSpellCaster();

  caster.spendsWillpower = true;

  const result = spellModifiersFromCaster(caster, SpellType.improvised);
  expect(result.willpower).toBeDefined();
  expect(result.willpower!.diceModifier).toBe(3);
});

test('sets no willpower value if caster does not spend willpower', () => {
  let caster = makeSpellCaster();

  caster.spendsWillpower = false;

  const result = spellModifiersFromCaster(caster, SpellType.improvised);
  expect(result[CharacterValueId.willpower]).toBeUndefined();
});

test('sets additional dice correct', () => {
  let caster = makeSpellCaster();

  const id1 = 'Luck';
  const addDice1 = makeDiceModifier('Luck', {
    diceModifier: 2,
  });

  const id2 = 'Demons';
  const addDice2 = makeDiceModifier('Demons', {
    diceModifier: 4,
  });

  caster.additionalSpellCastingDice = {[id1]: addDice1, [id2]: addDice2};

  const result = spellModifiersFromCaster(caster, SpellType.improvised);

  expect(result[SpellValueIds.additionalDice + '0']).toBeDefined();
  expect(diceModifier(result[SpellValueIds.additionalDice + '0'])).toBe(2);
  expect(result[SpellValueIds.additionalDice + '1']).toBeDefined();
  expect(diceModifier(result[SpellValueIds.additionalDice + '1'])).toBe(4);
});

test('to many active spells add reach', () => {
  let caster = makeSpellCaster({
    activeSpells: 5,
    gnosis: makeGnosisValue({diceModifier: 2}),
  });

  const result = spellModifiersFromCaster(caster, SpellType.improvised);
  expect(result.activeSpells).toBeDefined();
  expect(result.activeSpells!.reachModifier).toBe(3);
});

test('casting a spell not associated to your ruling arcana cost one mana if spell is improvised', () => {
  let caster = makeSpellCaster({
    highestSpellArcanum: makeCharactersArcanum(ArcanaType.death, {
      diceModifier: 2,
      rulingArcana: false,
    }),
  });

  const result = spellModifiersFromCaster(caster, SpellType.improvised);
  expect(result.notFromRulingArcana).toBeDefined();
  expect(result.notFromRulingArcana!.manaModifier).toBe(1);
});

test('casting a spell not associated to your ruling arcana cost no mana if spell is a praxis', () => {
  let caster = makeSpellCaster({
    highestSpellArcanum: makeCharactersArcanum(ArcanaType.death, {
      diceModifier: 2,
      rulingArcana: false,
    }),
  });

  const result = spellModifiersFromCaster(caster, SpellType.praxis);
  expect(result.notFromRulingArcana).toBeUndefined();
});

test('casting a spell not associated to your ruling arcana cost no mana if spell is a rote', () => {
  let caster = makeSpellCaster({
    highestSpellArcanum: makeCharactersArcanum(ArcanaType.death, {
      diceModifier: 2,
      rulingArcana: false,
    }),
  });

  const result = spellModifiersFromCaster(caster, SpellType.rote);
  expect(result.notFromRulingArcana).toBeUndefined();
});
