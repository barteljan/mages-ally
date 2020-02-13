import {SpellFactorType} from './SpellFactor.type';
import {SpellFactorLevel} from './SpellFactor.level';
import {spellFactorLabelPotency} from './potency.strings';
import {spellFactorLabelDuration} from './duration.strings';
import {spellFactorLabelScale} from './scale.strings';

export function spellFactorLabel(
  type: SpellFactorType,
  level: SpellFactorLevel,
  value: number,
): string {
  switch (type) {
    case SpellFactorType.castingTime:
      break;
    case SpellFactorType.duration:
      return spellFactorLabelDuration(level, value);
    case SpellFactorType.potency:
      return spellFactorLabelPotency(level, value);
    case SpellFactorType.range:
      break;
    case SpellFactorType.scale:
      return spellFactorLabelScale(level, value);
  }
  return '';
}
