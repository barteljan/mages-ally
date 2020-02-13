import {SpellFactorType} from './SpellFactor.type';
import {SpellFactorLevel} from './SpellFactor.level';
import {spellFactorLabelPotency} from './potency/potency.strings';
import {spellFactorLabelDuration} from './duration/duration.strings';
import {spellFactorLabelScale} from './scale/scale.strings';
import {GnosisRules} from '../../gnosis/GnosisRule';
import {gnosisRules as defaultGnosisRules} from '../../gnosis/gnosisRules';
import {makeCastingTimeRules} from './casting-time/castingTime.rules';
import {spellFactorLabelRange} from './range/range.strings';

export function spellFactorLabel(
  type: SpellFactorType,
  level: SpellFactorLevel,
  value: number,
  gnosisRules: GnosisRules[] = defaultGnosisRules,
  gnosis: number = 1,
): string {
  switch (type) {
    case SpellFactorType.castingTime:
      const rules = makeCastingTimeRules(gnosisRules, gnosis);
      if (level === SpellFactorLevel.advanced) {
        return rules.advanced[0].description;
      } else {
        return rules.standard[value] ? rules.standard[value].description : '';
      }
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
