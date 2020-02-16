import StringMap from '../../../data-types/StringMap';
import {SpellCaster} from '../Spell.config.caster';
import {DefaultKeys} from './DefaultKeys';
import {BaseDiceModifier} from '../../../data-types/BaseDiceModifier';
import {
  makeWillpowerValue,
  WillpowerValue,
} from '../../character/WillpowerValue';
import {GnosisValue} from '../../character/GnosisValue';
import {CharacterValueId} from '../../character/CharacterValue.id';
import {CharactersArcanum} from '../../character/CharactersArcanum';
import {CharacterSkill} from '../../character/CharacterSkill';

type SpellModifiersFromCasterResult = {
  [CharacterValueId.gnosis]: GnosisValue;
  [DefaultKeys.highestArcanum]: CharactersArcanum;
  [CharacterValueId.willpower]: WillpowerValue | undefined;
  [DefaultKeys.roteSkill]: CharacterSkill | undefined;
  [id: string]: BaseDiceModifier | undefined;
};

export function spellModifiersFromCaster(
  caster: SpellCaster,
  isRote: boolean,
): SpellModifiersFromCasterResult {
  let map: StringMap<BaseDiceModifier> = {
    [CharacterValueId.gnosis]: caster.gnosis,
    [DefaultKeys.highestArcanum]: caster.highestSpellArcanum,
  };

  if (caster.spendsWillpower) {
    let willpower = makeWillpowerValue({diceModifier: 3});
    map[CharacterValueId.willpower] = willpower;
  }

  if (isRote) {
    map[DefaultKeys.roteSkill] = caster.roteSkill;
  }

  let i = 0;
  for (let key in caster.additionalSpellCastingDice) {
    const additionalDiceKey = DefaultKeys.additionalDice + i;
    i++;
    map[additionalDiceKey] = caster.additionalSpellCastingDice[key];
  }

  return (map as unknown) as SpellModifiersFromCasterResult;
}
