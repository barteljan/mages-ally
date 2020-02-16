import {CastingTimeRuleLevel} from './casting-time/castingTime.rules';
import {DurationRuleLevel} from './duration/duration.rules';
import {PotencyRuleLevel} from './potency/potency.rules';
import {ScaleRuleLevel} from './scale/scale.rules';
import {RangeRulesLevel} from './range/range.rules';

export enum SpellFactorType {
  potency = 'potency',
  castingTime = 'castingTime',
  duration = 'duration',
  range = 'range',
  scale = 'scale',
}

export type SpellFactorRulesLevels =
  | CastingTimeRuleLevel
  | DurationRuleLevel
  | PotencyRuleLevel
  | ScaleRuleLevel
  | RangeRulesLevel;
