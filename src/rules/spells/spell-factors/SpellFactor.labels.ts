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
  gnosis: number,
  primaryFactor: SpellFactorType,
  highestArcanumValue: number,
  gnosisRules: GnosisRules[] = defaultGnosisRules,
): string | undefined {
  const index = value - 1;

  switch (type) {
    case SpellFactorType.castingTime:
      return spellFactorLabelCastingTime(level, index, gnosis, gnosisRules);
    case SpellFactorType.duration:
      return spellFactorLabelDuration(
        level,
        index,
        primaryFactor,
        highestArcanumValue,
      );
    case SpellFactorType.potency:
      return spellFactorLabelPotency(
        level,
        index,
        primaryFactor,
        highestArcanumValue,
      );
    case SpellFactorType.range:
      return spellFactorLabelRange(level, index);
    case SpellFactorType.scale:
      return spellFactorLabelScale(level, index);
  }
  return '';
}
