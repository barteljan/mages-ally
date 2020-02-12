import StringMap from '../../../data-types/StringMap';
import {SpellCaster} from '../Spell.config';
import uuid from 'uuid';

export enum DefaultKeys {
  roteSkill = 'rote-skill',
  additionalDice = 'additional dice',
  willpower = 'willpower',
  gnosis = 'gnosis',
}

export function diceModifiersFromCaster(
  caster: SpellCaster,
  isRote: boolean,
): StringMap<number> {
  let map: StringMap<number> = {
    [DefaultKeys.gnosis]: caster.gnosis,
    [caster.highestSpellArcanum.type]: caster.highestSpellArcanum.value,
  };

  if (caster.spendsWillpower) {
    map[DefaultKeys.willpower] = 3;
  }

  if (isRote) {
    let key =
      caster.roteSkill.name.length > 0
        ? caster.roteSkill.name
        : DefaultKeys.roteSkill;

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
      key = DefaultKeys.additionalDice + (alreadyReplacedKey ? ' ' + i : '');
    }

    // do not overwrite a former modifier
    if (map[key]) {
      key = key + '_' + uuid.v4();
    }
    map[key] = caster.additionalSpellCastingDice[unmodifiedKey];
  }

  return map;
}
