import StringMap from '../../../data-types/StringMap';
import {SpellCaster} from '../Spell.config';
import uuid from 'uuid';
import {localization} from './localization';
import {DefaultKeys} from './DefaultKeys';
import {DiceModifier} from '../../../data-types/DiceModifier';
import {makeWillpowerValue} from '../../../rules/character/WillpowerValue';

export function diceModifiersFromCaster(
  caster: SpellCaster,
  isRote: boolean,
): StringMap<DiceModifier> {
  let map: StringMap<DiceModifier> = {
    [caster.gnosis.id]: caster.gnosis,
    [caster.highestSpellArcanum.arcanumType]: caster.highestSpellArcanum,
  };

  if (caster.spendsWillpower) {
    let willpower = makeWillpowerValue({diceModifier: 3});
    map[willpower.id] = willpower;
  }

  if (isRote) {
    map[caster.roteSkill.id] = caster.roteSkill;
  }

  let i = 0;
  let alreadyReplacedKey = false;
  for (let key in caster.additionalSpellCastingDice) {
    const unmodifiedKey = key;
    i++;

    if (key.length === 0) {
      key =
        localization[DefaultKeys.additionalDice] +
        (alreadyReplacedKey ? ' ' + i : '');
    }

    // do not overwrite a former modifier
    if (map[key]) {
      key = key + '_' + uuid.v4();
    }
    map[key] = caster.additionalSpellCastingDice[unmodifiedKey];
  }

  return map;
}
