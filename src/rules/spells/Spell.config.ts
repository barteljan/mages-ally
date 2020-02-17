import moment from 'moment';
import uuid from 'uuid';
import {
  ParadoxCircumstances,
  makeParadoxCircumstances,
} from './paradox/ParadoxCircumstances';
import {SpellCaster, makeSpellCaster} from './Spell.config.caster';
import {Subject, makeDefaultSubject} from './Spell.config.subject';
import {
  SpellSpecification,
  makeSpellSpecification,
} from './Spell.config.specification';

export type SpellCastingConfig = {
  id: string;
  createdAt: number;
  caster: SpellCaster;
  subject: Subject;
  spell: SpellSpecification;
  paradox: ParadoxCircumstances;
};

export function makeSpellCastingConfig(
  config?: Partial<SpellCastingConfig>,
  id: string = uuid.v4(),
  createdAt: number = moment().unix(),
): SpellCastingConfig {
  return {
    caster: makeSpellCaster({}),
    createdAt,
    id,
    paradox: makeParadoxCircumstances(),
    spell: makeSpellSpecification(),
    subject: makeDefaultSubject(),
    ...config,
  };
}
