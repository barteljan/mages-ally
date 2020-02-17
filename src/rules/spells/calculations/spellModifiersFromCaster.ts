import StringMap from '../../../data-types/StringMap';
import {SpellCaster} from '../Spell.config.caster';
import {SpellValueIds} from '../spell-values/SpellValueIds';
import {BaseDiceModifier} from '../../model/BaseDiceModifier';
import {
  makeWillpowerValue,
  WillpowerValue,
} from '../../character/WillpowerValue';
import {GnosisValue} from '../../character/GnosisValue';
import {
  makeNotFromRulingArcana,
  NotRulingArcanaValue,
} from '../spell-values/NotRulingArcanaValue';
import {CharacterValueId} from '../../character/CharacterValue.id';
import {CharactersArcanum} from '../../character/CharactersArcanum';
import {BaseReachModifier} from 'src/rules/model/BaseReachModifier';
import {BaseManaModifier} from 'src/rules/model/BaseManaModifier';
import {
  makeActiveSpellReachModifierValue,
  ActiveSpellReachModifierValue,
} from '../spell-values/ActiveSpellReachModifierValue';
import {SpellType} from '../Spell.type';

export type SpellModifiersFromCasterResult = {
  [CharacterValueId.gnosis]: GnosisValue;
  [SpellValueIds.highestArcanum]: CharactersArcanum;
  [CharacterValueId.willpower]?: WillpowerValue;
  [SpellValueIds.activeSpells]?: ActiveSpellReachModifierValue;
  [SpellValueIds.notFromRulingArcana]?: NotRulingArcanaValue;
  [id: string]:
    | BaseDiceModifier
    | undefined
    | BaseManaModifier
    | BaseReachModifier;
};

export function spellModifiersFromCaster(
  caster: SpellCaster,
  spellType: SpellType,
): SpellModifiersFromCasterResult {
  let map: StringMap<
    BaseDiceModifier | BaseReachModifier | BaseManaModifier
  > = {
    [CharacterValueId.gnosis]: caster.gnosis,
    [SpellValueIds.highestArcanum]: caster.highestSpellArcanum,
  };

  //casting a spell not associated to your ruling arcana cost one mana
  if (
    caster.highestSpellArcanum &&
    caster.highestSpellArcanum.rulingArcana === false &&
    spellType === SpellType.improvised
  ) {
    const notRulingArcana = makeNotFromRulingArcana({manaModifier: 1});
    map[notRulingArcana.id] = notRulingArcana;
  }

  //each active spell above your gnosis values cost reach
  if (caster.activeSpells > caster.gnosis.diceModifier) {
    const activeSpells = makeActiveSpellReachModifierValue({
      reachModifier: caster.activeSpells - caster.gnosis.diceModifier,
    });
    map[activeSpells.id] = activeSpells;
  }

  // spending willpower gives you additional 3 dice
  if (caster.spendsWillpower) {
    const willpower = makeWillpowerValue({diceModifier: 3});
    map[CharacterValueId.willpower] = willpower;
  }

  // if you get additional spellcasting dices (for example from fate-magic)
  let i = 0;
  for (let key in caster.additionalSpellCastingDice) {
    const additionalDiceKey = SpellValueIds.additionalDice + i;
    i++;
    map[additionalDiceKey] = caster.additionalSpellCastingDice[key];
  }

  return (map as unknown) as SpellModifiersFromCasterResult;
}
