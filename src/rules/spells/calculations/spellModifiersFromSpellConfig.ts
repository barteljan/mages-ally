import {SpellCastingConfig} from '../Spell.config';
import {
  spellModifiersFromCaster,
  SpellModifiersFromCasterResult,
} from './spellModifiersFromCaster';
import {
  spellModifiersFromSpecification,
  SpellModifiersFromSpecificationResult,
} from './spellModifiersFromSpecification';
import StringMap from 'src/data-types/StringMap';
import {BaseDiceModifier, toDiceModifier} from '../../model/BaseDiceModifier';
import {
  BaseReachModifier,
  toReachModifier,
} from '../../model/BaseReachModifier';
import {BaseManaModifier, toManaModifier} from '../../model/BaseManaModifier';

export type SpellModifiersFromSpellConfigResult = {
  modifiers:
    | SpellModifiersFromCasterResult
    | SpellModifiersFromSpecificationResult;
  dices: number;
  reaches: number;
  mana: number;
};

export function spellModifiersFromSpellConfig(
  config: SpellCastingConfig,
): SpellModifiersFromSpellConfigResult {
  let modifiers: StringMap<
    BaseDiceModifier | BaseReachModifier | BaseManaModifier | undefined
  > = {...spellModifiersFromCaster(config.caster, config.spell.type)};

  const specificationModifiers = spellModifiersFromSpecification(
    config.caster.highestSpellArcanum,
    config.spell,
  );

  modifiers = {...modifiers, ...specificationModifiers};

  let dices = 0;
  let reaches = 0;
  let mana = 0;
  for (let key in modifiers) {
    const modifier = modifiers[key];

    const diceModifier = toDiceModifier(modifier);
    if (diceModifier) {
      dices += diceModifier.diceModifier;
    }

    const reachModifier = toReachModifier(modifier);
    if (reachModifier) {
      reaches += reachModifier.reachModifier;
    }

    const manaModifier = toManaModifier(modifier);
    if (manaModifier) {
      mana += manaModifier.manaModifier;
    }
  }

  return {
    modifiers: modifiers as SpellModifiersFromSpellConfigResult['modifiers'],
    dices,
    reaches,
    mana,
  };
}
