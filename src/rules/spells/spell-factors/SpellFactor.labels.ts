import {SpellFactorType} from './SpellFactor.type';
import {SpellFactorLevel} from './SpellFactor.level';
import {spellFactorLabelPotency} from './potency/potency.strings';
import {spellFactorLabelDuration} from './duration/duration.strings';
import {spellFactorLabelScale} from './scale/scale.strings';
import {GnosisRules} from '../../gnosis/GnosisRule';
import {gnosisRules as defaultGnosisRules} from '../../gnosis/gnosisRules';
import {spellFactorLabelRange} from './range/range.strings';
import {spellFactorLabelCastingTime} from './casting-time/castingTime.strings';

export function spellFactorLabel(
  type: SpellFactorType,
  level: SpellFactorLevel,
  value: number,
  gnosisRules: GnosisRules[] = defaultGnosisRules,
  gnosis: number = 1,
): string | undefined {
  switch (type) {
    case SpellFactorType.castingTime:
      return spellFactorLabelCastingTime(level, value, gnosis, gnosisRules);
    case SpellFactorType.duration:
      return spellFactorLabelDuration(level, value);
    case SpellFactorType.potency:
      return spellFactorLabelPotency(level, value);
    case SpellFactorType.range:
      return spellFactorLabelRange(level, value);
    case SpellFactorType.scale:
      return spellFactorLabelScale(level, value);
  }
  return '';
}
