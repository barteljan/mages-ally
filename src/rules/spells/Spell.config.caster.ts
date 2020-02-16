import {
  CharactersArcanum,
  makeCharactersArcanum,
} from '../character/CharactersArcanum';
import {CharacterSkill, makeCharacterSkill} from '../character/CharacterSkill';
import StringMap from '../../data-types/StringMap';
import {BaseDiceModifier} from '../../data-types/BaseDiceModifier';
import {GnosisValue, makeGnosisValue} from '../character/GnosisValue';
import {ArcanaType} from './arcana/Arcana.type';

export type SpellCaster = {
  gnosis: GnosisValue;
  highestSpellArcanum: CharactersArcanum;
  activeSpells: number;
  additionalSpellCastingDice: StringMap<BaseDiceModifier>;
  spendsWillpower: boolean;
  roteSkill: CharacterSkill;
};

export function makeDefaultSpellCaster(
  spellCaster?: Partial<SpellCaster>,
): SpellCaster {
  return {
    activeSpells: 0,
    additionalSpellCastingDice: {},
    gnosis: makeGnosisValue({diceModifier: 1}),
    highestSpellArcanum: makeCharactersArcanum(ArcanaType.death),
    roteSkill: makeCharacterSkill('skill'),
    spendsWillpower: false,
    ...spellCaster,
  };
}
