import moment from 'moment';
import uuid from 'uuid';
import {
  ParadoxCircumstances,
  makeParadoxCircumstances,
} from './paradox/ParadoxCircumstances';
import {SpellCaster, makeDefaultSpellCaster} from './Spell.config.caster';
import {Subject, makeDefaultSubject} from './Spell.config.subject';
import {
  SpellSpecification,
  makeDefaultSpellSpecification,
} from './Spell.config.specification';

export type SpellCastingConfig = {
  id: string;
  createdAt: number;
  caster: SpellCaster;
  subject: Subject;
  spell: SpellSpecification;
  paradox: ParadoxCircumstances;
};

export function makeDefaultCastingConfig(
  config?: Partial<SpellCastingConfig>,
  id: string = uuid.v4(),
  createdAt: number = moment().unix(),
): SpellCastingConfig {
  return {
    caster: makeDefaultSpellCaster({}),
    createdAt,
    id,
    paradox: makeParadoxCircumstances(),
    spell: makeDefaultSpellSpecification({}),
    subject: makeDefaultSubject({}),
    ...config,
  };
}
