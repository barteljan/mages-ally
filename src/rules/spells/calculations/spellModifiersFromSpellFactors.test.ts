import {spellModifiersFromSpellFactors} from './spellModifiersFromSpellFactors';
import {
  makeCharactersArcanum,
  CharactersArcanum,
} from '../../character/CharactersArcanum';
import {ArcanaType} from '../arcana/Arcana.type';
import {SpellFactorType} from '../spell-factors/SpellFactor.type';
import {SpellCastingConfig} from '../Spell.config';
import {SpellFactorLevel} from '../spell-factors/SpellFactor.level';
import {makeSpellFactor} from '../spell-factors/SpellFactor';
import {
  SpellSpecificationSpellFactors,
  makeSpellSpecificationSpellFactors,
  makeSpellSpecificationAdditionalSpecs,
} from '../Spell.config.specification';
import {GameValueType} from '../../../GameValueTypes';

test('test result has the correct structure', () => {
  const highestArcanum = makeCharactersArcanum(ArcanaType.death, {
    diceModifier: 1,
  });

  const primaryFactor = SpellFactorType.potency;

  const factors: SpellCastingConfig['spell']['spellFactors'] = {
    castingTime: makeSpellFactor(SpellFactorType.castingTime, {
      level: SpellFactorLevel.standard,
      value: 1,
    }),
    duration: makeSpellFactor(SpellFactorType.duration, {
      level: SpellFactorLevel.standard,
      value: 1,
    }),
    potency: makeSpellFactor(SpellFactorType.potency, {
      level: SpellFactorLevel.standard,
      value: 1,
    }),
    range: makeSpellFactor(SpellFactorType.range, {
      level: SpellFactorLevel.standard,
      value: 1,
    }),
    scale: makeSpellFactor(SpellFactorType.scale, {
      level: SpellFactorLevel.standard,
      value: 1,
    }),
  };

  const modifiers = spellModifiersFromSpellFactors(
    highestArcanum,
    primaryFactor,
    makeSpellSpecificationAdditionalSpecs(),
    factors,
  );

  expect(modifiers.castingTime.diceModifier).toBeDefined();
  expect(modifiers.castingTime.spellFactorType).toBeDefined();
  expect(modifiers.castingTime.level).toBeDefined();
  expect(modifiers.duration.diceModifier).toBeDefined();
  expect(modifiers.duration.spellFactorType).toBeDefined();
  expect(modifiers.duration.level).toBeDefined();
  expect(modifiers.potency.diceModifier).toBeDefined();
  expect(modifiers.potency.spellFactorType).toBeDefined();
  expect(modifiers.potency.level).toBeDefined();
  expect(modifiers.range.diceModifier).toBeDefined();
  expect(modifiers.range.spellFactorType).toBeDefined();
  expect(modifiers.range.level).toBeDefined();
  expect(modifiers.scale.diceModifier).toBeDefined();
  expect(modifiers.scale.spellFactorType).toBeDefined();
  expect(modifiers.scale.level).toBeDefined();
});

test('test result give the correct dice modifiers with primary factor duration', () => {
  const highestArcanum = makeCharactersArcanum(ArcanaType.death, {
    diceModifier: 2,
  });

  const primaryFactor = SpellFactorType.duration;

  const factors: SpellSpecificationSpellFactors = {
    potency: makeSpellFactor(SpellFactorType.potency, {
      level: SpellFactorLevel.standard,
      value: 3,
    }),
    castingTime: makeSpellFactor(SpellFactorType.castingTime, {
      level: SpellFactorLevel.standard,
      value: 3,
    }),
    duration: makeSpellFactor(SpellFactorType.duration, {
      level: SpellFactorLevel.standard,
      value: 3,
    }),
    range: makeSpellFactor(SpellFactorType.range, {
      level: SpellFactorLevel.standard,
      value: 1,
    }),
    scale: makeSpellFactor(SpellFactorType.scale, {
      level: SpellFactorLevel.standard,
      value: 3,
    }),
  };

  const modifiers = spellModifiersFromSpellFactors(
    highestArcanum,
    primaryFactor,
    makeSpellSpecificationAdditionalSpecs(),
    factors,
  );

  expect(modifiers.potency.diceModifier).toBe(-4);
  expect(modifiers.castingTime.diceModifier).toBe(2);
  expect(modifiers.duration.diceModifier).toBe(-2);
  expect(modifiers.range.diceModifier).toBe(0);
  expect(modifiers.scale.diceModifier).toBe(-4);
});

test('test result give the correct dice modifiers with primary factor potency', () => {
  const highestArcanum = makeCharactersArcanum(ArcanaType.death, {
    diceModifier: 2,
  });

  const primaryFactor = SpellFactorType.potency;

  const factors: SpellSpecificationSpellFactors = {
    potency: makeSpellFactor(SpellFactorType.potency, {
      level: SpellFactorLevel.standard,
      value: 3,
    }),
    castingTime: makeSpellFactor(SpellFactorType.castingTime, {
      level: SpellFactorLevel.standard,
      value: 3,
    }),
    duration: makeSpellFactor(SpellFactorType.duration, {
      level: SpellFactorLevel.standard,
      value: 3,
    }),
    range: makeSpellFactor(SpellFactorType.range, {
      level: SpellFactorLevel.standard,
      value: 1,
    }),
    scale: makeSpellFactor(SpellFactorType.scale, {
      level: SpellFactorLevel.standard,
      value: 3,
    }),
  };

  const modifiers = spellModifiersFromSpellFactors(
    highestArcanum,
    primaryFactor,
    makeSpellSpecificationAdditionalSpecs(),
    factors,
  );

  expect(modifiers.potency.diceModifier).toBe(-2);
  expect(modifiers.castingTime.diceModifier).toBe(2);
  expect(modifiers.duration.diceModifier).toBe(-4);
  expect(modifiers.range.diceModifier).toBe(0);
  expect(modifiers.scale.diceModifier).toBe(-4);
});

function diceModifierForPotencyAndHighestArkanum(
  potencyStrength: number,
  highestArcanumValue: number,
) {
  const highestArcanum = makeCharactersArcanum(ArcanaType.death, {
    diceModifier: highestArcanumValue,
  });
  const primaryFactor = SpellFactorType.potency;

  let factors = makeSpellSpecificationSpellFactors({
    potency: makeSpellFactor(SpellFactorType.potency, {
      value: potencyStrength,
    }),
  });

  return spellModifiersFromSpellFactors(
    highestArcanum,
    primaryFactor,
    makeSpellSpecificationAdditionalSpecs(),
    factors,
  ).potency.diceModifier;
}

test('primary factor potency highestArcanum 1', () => {
  expect(diceModifierForPotencyAndHighestArkanum(1, 1)).toBe(0);
  expect(diceModifierForPotencyAndHighestArkanum(2, 1)).toBe(-2);
  expect(diceModifierForPotencyAndHighestArkanum(3, 1)).toBe(-4);
  expect(diceModifierForPotencyAndHighestArkanum(4, 1)).toBe(-6);
  expect(diceModifierForPotencyAndHighestArkanum(5, 1)).toBe(-8);
  expect(diceModifierForPotencyAndHighestArkanum(6, 1)).toBe(-10);
  expect(diceModifierForPotencyAndHighestArkanum(7, 1)).toBe(-12);
  expect(diceModifierForPotencyAndHighestArkanum(8, 1)).toBe(-14);
  expect(diceModifierForPotencyAndHighestArkanum(9, 1)).toBe(-16);
  expect(diceModifierForPotencyAndHighestArkanum(10, 1)).toBe(-18);
  expect(diceModifierForPotencyAndHighestArkanum(11, 1)).toBe(-20);
});

test('primary factor potency highestArcanum 2', () => {
  expect(diceModifierForPotencyAndHighestArkanum(1, 2)).toBe(0);
  expect(diceModifierForPotencyAndHighestArkanum(2, 2)).toBe(0);
  expect(diceModifierForPotencyAndHighestArkanum(3, 2)).toBe(-2);
  expect(diceModifierForPotencyAndHighestArkanum(4, 2)).toBe(-4);
  expect(diceModifierForPotencyAndHighestArkanum(5, 2)).toBe(-6);
  expect(diceModifierForPotencyAndHighestArkanum(6, 2)).toBe(-8);
  expect(diceModifierForPotencyAndHighestArkanum(7, 2)).toBe(-10);
  expect(diceModifierForPotencyAndHighestArkanum(8, 2)).toBe(-12);
  expect(diceModifierForPotencyAndHighestArkanum(9, 2)).toBe(-14);
  expect(diceModifierForPotencyAndHighestArkanum(10, 2)).toBe(-16);
  expect(diceModifierForPotencyAndHighestArkanum(11, 2)).toBe(-18);
});

test('primary factor potency highestArcanum 3', () => {
  expect(diceModifierForPotencyAndHighestArkanum(1, 3)).toBe(0);
  expect(diceModifierForPotencyAndHighestArkanum(2, 3)).toBe(0);
  expect(diceModifierForPotencyAndHighestArkanum(3, 3)).toBe(0);
  expect(diceModifierForPotencyAndHighestArkanum(4, 3)).toBe(-2);
  expect(diceModifierForPotencyAndHighestArkanum(5, 3)).toBe(-4);
  expect(diceModifierForPotencyAndHighestArkanum(6, 3)).toBe(-6);
  expect(diceModifierForPotencyAndHighestArkanum(7, 3)).toBe(-8);
  expect(diceModifierForPotencyAndHighestArkanum(8, 3)).toBe(-10);
  expect(diceModifierForPotencyAndHighestArkanum(9, 3)).toBe(-12);
  expect(diceModifierForPotencyAndHighestArkanum(10, 3)).toBe(-14);
  expect(diceModifierForPotencyAndHighestArkanum(11, 3)).toBe(-16);
});

test('result gives correct number of reaches needed (all factores are advanced)', () => {
  const highestArcanum = makeCharactersArcanum(ArcanaType.death, {
    diceModifier: 2,
  });

  const primaryFactor = SpellFactorType.potency;

  const advancedFactors: SpellSpecificationSpellFactors = {
    potency: makeSpellFactor(SpellFactorType.potency, {
      level: SpellFactorLevel.advanced,
      value: 1,
    }),
    castingTime: makeSpellFactor(SpellFactorType.castingTime, {
      level: SpellFactorLevel.advanced,
      value: 1,
    }),
    duration: makeSpellFactor(SpellFactorType.duration, {
      level: SpellFactorLevel.advanced,
      value: 1,
    }),
    range: makeSpellFactor(SpellFactorType.range, {
      level: SpellFactorLevel.advanced,
      value: 1,
    }),
    scale: makeSpellFactor(SpellFactorType.scale, {
      level: SpellFactorLevel.advanced,
      value: 1,
    }),
  };

  const modifiersWithAdvancedFactors = spellModifiersFromSpellFactors(
    highestArcanum,
    primaryFactor,
    makeSpellSpecificationAdditionalSpecs(),
    advancedFactors,
  );

  expect(modifiersWithAdvancedFactors.potency.reachModifier).toBe(1);
  expect(modifiersWithAdvancedFactors.castingTime.reachModifier).toBe(1);
  expect(modifiersWithAdvancedFactors.duration.reachModifier).toBe(1);
  expect(modifiersWithAdvancedFactors.range.reachModifier).toBe(1);
  expect(modifiersWithAdvancedFactors.scale.reachModifier).toBe(1);
});

test('result gives correct number of reaches needed (all factores are standard)', () => {
  const highestArcanum = makeCharactersArcanum(ArcanaType.death, {
    diceModifier: 2,
  });

  const primaryFactor = SpellFactorType.potency;

  const standardFactors: SpellSpecificationSpellFactors = {
    potency: makeSpellFactor(SpellFactorType.potency, {
      level: SpellFactorLevel.standard,
      value: 3,
    }),
    castingTime: makeSpellFactor(SpellFactorType.castingTime, {
      level: SpellFactorLevel.standard,
      value: 3,
    }),
    duration: makeSpellFactor(SpellFactorType.duration, {
      level: SpellFactorLevel.standard,
      value: 3,
    }),
    range: makeSpellFactor(SpellFactorType.range, {
      level: SpellFactorLevel.standard,
      value: 1,
    }),
    scale: makeSpellFactor(SpellFactorType.scale, {
      level: SpellFactorLevel.standard,
      value: 3,
    }),
  };

  const modifiersWithStandardFactors = spellModifiersFromSpellFactors(
    highestArcanum,
    primaryFactor,
    makeSpellSpecificationAdditionalSpecs(),
    standardFactors,
  );

  expect(modifiersWithStandardFactors.potency.reachModifier).toBe(0);
  expect(modifiersWithStandardFactors.castingTime.reachModifier).toBe(0);
  expect(modifiersWithStandardFactors.duration.reachModifier).toBe(0);
  expect(modifiersWithStandardFactors.range.reachModifier).toBe(0);
  expect(modifiersWithStandardFactors.scale.reachModifier).toBe(0);
});

test('result gives correct number of reaches with everywhere activated', () => {
  const highestArcanum = makeCharactersArcanum(ArcanaType.death, {
    diceModifier: 2,
  });

  const primaryFactor = SpellFactorType.potency;

  const advancedFactors: SpellSpecificationSpellFactors = {
    potency: makeSpellFactor(SpellFactorType.potency, {
      level: SpellFactorLevel.advanced,
      value: 1,
    }),
    castingTime: makeSpellFactor(SpellFactorType.castingTime, {
      level: SpellFactorLevel.advanced,
      value: 1,
    }),
    duration: makeSpellFactor(SpellFactorType.duration, {
      level: SpellFactorLevel.advanced,
      value: 1,
    }),
    range: makeSpellFactor(SpellFactorType.range, {
      level: SpellFactorLevel.advanced,
      value: 1,
    }),
    scale: makeSpellFactor(SpellFactorType.scale, {
      level: SpellFactorLevel.advanced,
      value: 1,
    }),
  };

  const modifiersWithAdvancedFactors = spellModifiersFromSpellFactors(
    highestArcanum,
    primaryFactor,
    makeSpellSpecificationAdditionalSpecs({everywhere: true}),
    advancedFactors,
  );

  expect(modifiersWithAdvancedFactors.potency.reachModifier).toBe(1);
  expect(modifiersWithAdvancedFactors.castingTime.reachModifier).toBe(1);
  expect(modifiersWithAdvancedFactors.duration.reachModifier).toBe(1);
  expect(modifiersWithAdvancedFactors.range.reachModifier).toBe(1);
  expect(modifiersWithAdvancedFactors.scale.reachModifier).toBe(0);
});

test('result gives correct number of mana with everywhere activated', () => {
  const highestArcanum = makeCharactersArcanum(ArcanaType.death, {
    diceModifier: 2,
  });

  const primaryFactor = SpellFactorType.potency;

  const advancedFactors: SpellSpecificationSpellFactors = {
    potency: makeSpellFactor(SpellFactorType.potency, {
      level: SpellFactorLevel.advanced,
      value: 1,
    }),
    castingTime: makeSpellFactor(SpellFactorType.castingTime, {
      level: SpellFactorLevel.advanced,
      value: 1,
    }),
    duration: makeSpellFactor(SpellFactorType.duration, {
      level: SpellFactorLevel.advanced,
      value: 1,
    }),
    range: makeSpellFactor(SpellFactorType.range, {
      level: SpellFactorLevel.advanced,
      value: 1,
    }),
    scale: makeSpellFactor(SpellFactorType.scale, {
      level: SpellFactorLevel.advanced,
      value: 1,
    }),
  };

  const modifiersWithAdvancedFactors = spellModifiersFromSpellFactors(
    highestArcanum,
    primaryFactor,
    makeSpellSpecificationAdditionalSpecs({everywhere: true}),
    advancedFactors,
  );

  expect(modifiersWithAdvancedFactors.scale.manaModifier).toBe(1);
});

test('result gives correct number of reaches with time in a bottle activated', () => {
  const highestArcanum = makeCharactersArcanum(ArcanaType.death, {
    diceModifier: 1,
  });

  const primaryFactor = SpellFactorType.potency;

  const advancedFactors: SpellSpecificationSpellFactors = {
    potency: makeSpellFactor(SpellFactorType.potency, {
      level: SpellFactorLevel.advanced,
      value: 1,
    }),
    castingTime: makeSpellFactor(SpellFactorType.castingTime, {
      level: SpellFactorLevel.advanced,
      value: 1,
    }),
    duration: makeSpellFactor(SpellFactorType.duration, {
      level: SpellFactorLevel.advanced,
      value: 1,
    }),
    range: makeSpellFactor(SpellFactorType.range, {
      level: SpellFactorLevel.advanced,
      value: 1,
    }),
    scale: makeSpellFactor(SpellFactorType.scale, {
      level: SpellFactorLevel.advanced,
      value: 1,
    }),
  };

  const modifiersWithAdvancedFactors = spellModifiersFromSpellFactors(
    highestArcanum,
    primaryFactor,
    makeSpellSpecificationAdditionalSpecs({timeInABottle: true}),
    advancedFactors,
  );

  expect(modifiersWithAdvancedFactors.potency.reachModifier).toBe(1);
  expect(modifiersWithAdvancedFactors.castingTime.reachModifier).toBe(0);
  expect(modifiersWithAdvancedFactors.duration.reachModifier).toBe(1);
  expect(modifiersWithAdvancedFactors.range.reachModifier).toBe(1);
  expect(modifiersWithAdvancedFactors.scale.reachModifier).toBe(1);
});

test('result gives correct number of mana with timeinabottle activated', () => {
  const highestArcanum = makeCharactersArcanum(ArcanaType.death, {
    diceModifier: 2,
  });

  const primaryFactor = SpellFactorType.potency;

  const advancedFactors: SpellSpecificationSpellFactors = {
    potency: makeSpellFactor(SpellFactorType.potency, {
      level: SpellFactorLevel.advanced,
      value: 1,
    }),
    castingTime: makeSpellFactor(SpellFactorType.castingTime, {
      level: SpellFactorLevel.advanced,
      value: 1,
    }),
    duration: makeSpellFactor(SpellFactorType.duration, {
      level: SpellFactorLevel.advanced,
      value: 1,
    }),
    range: makeSpellFactor(SpellFactorType.range, {
      level: SpellFactorLevel.advanced,
      value: 1,
    }),
    scale: makeSpellFactor(SpellFactorType.scale, {
      level: SpellFactorLevel.advanced,
      value: 1,
    }),
  };

  const modifiersWithAdvancedFactors = spellModifiersFromSpellFactors(
    highestArcanum,
    primaryFactor,
    makeSpellSpecificationAdditionalSpecs({timeInABottle: true}),
    advancedFactors,
  );

  expect(modifiersWithAdvancedFactors.castingTime.manaModifier).toBe(1);
});

test('result gives correct mana and reach for indefinite duration', () => {
  const highestArcanum = makeCharactersArcanum(ArcanaType.death, {
    diceModifier: 2,
  });

  const primaryFactor = SpellFactorType.potency;

  const advancedFactors: SpellSpecificationSpellFactors = {
    potency: makeSpellFactor(SpellFactorType.potency, {
      level: SpellFactorLevel.advanced,
      value: 1,
    }),
    castingTime: makeSpellFactor(SpellFactorType.castingTime, {
      level: SpellFactorLevel.advanced,
      value: 1,
    }),
    duration: makeSpellFactor(SpellFactorType.duration, {
      level: SpellFactorLevel.advanced,
      value: 6,
    }),
    range: makeSpellFactor(SpellFactorType.range, {
      level: SpellFactorLevel.advanced,
      value: 1,
    }),
    scale: makeSpellFactor(SpellFactorType.scale, {
      level: SpellFactorLevel.advanced,
      value: 1,
    }),
  };

  const modifiersWithAdvancedFactors = spellModifiersFromSpellFactors(
    highestArcanum,
    primaryFactor,
    makeSpellSpecificationAdditionalSpecs(),
    advancedFactors,
  );

  expect(modifiersWithAdvancedFactors.duration.manaModifier).toBe(1);
  expect(modifiersWithAdvancedFactors.duration.reachModifier).toBe(2);
});

test('potency is calculated correct', () => {
  const highestArcanum: CharactersArcanum = {
    id: ArcanaType.death,
    arcanumType: ArcanaType.death,
    type: GameValueType.arcanum,
    highest: false,
    rulingArcana: false,
    diceModifier: 1,
  };

  const factors: SpellSpecificationSpellFactors = makeSpellSpecificationSpellFactors();

  const modifiers = spellModifiersFromSpellFactors(
    highestArcanum,
    SpellFactorType.potency,
    makeSpellSpecificationAdditionalSpecs(),
    factors,
  );

  expect(modifiers.potency).toBeDefined();
  expect(modifiers.potency.diceModifier).toBe(0);
});
