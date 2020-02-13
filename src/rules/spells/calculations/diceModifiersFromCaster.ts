import StringMap from '../../../data-types/StringMap';
import {SpellCaster} from '../Spell.config';
import uuid from 'uuid';
import {localization} from './localization';
import {DefaultKeys} from './DefaultKeys';

export function diceModifiersFromCaster(
  caster: SpellCaster,
  isRote: boolean,
): StringMap<number> {
  let map: StringMap<number> = {
    [localization[DefaultKeys.gnosis]]: caster.gnosis,
    [localization[caster.highestSpellArcanum.type]]:
      caster.highestSpellArcanum.value,
  };

  if (caster.spendsWillpower) {
    map[localization[DefaultKeys.willpower]] = 3;
  }

  if (isRote) {
    let key =
      caster.roteSkill.name.length > 0
        ? caster.roteSkill.name
        : localization[DefaultKeys.roteSkill];

    // do not overwrite a former modifier
    if (map[key]) {
      key = key + '_' + uuid.v4();
    }
    map[key] = caster.roteSkill.value;
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
