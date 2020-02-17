import {
  CharactersArcanum,
  makeCharactersArcanum,
} from '../character/CharactersArcanum';
import StringMap from '../../data-types/StringMap';
import {BaseDiceModifier} from '../model/BaseDiceModifier';
import {GnosisValue, makeGnosisValue} from '../character/GnosisValue';
import {ArcanaType} from './arcana/Arcana.type';

export type SpellCaster = {
  gnosis: GnosisValue;
  highestSpellArcanum: CharactersArcanum;
  activeSpells: number;
  additionalSpellCastingDice: StringMap<BaseDiceModifier>;
  spendsWillpower: boolean;
};

export function makeSpellCaster(
  spellCaster?: Partial<SpellCaster>,
): SpellCaster {
  return {
    activeSpells: 0,
    additionalSpellCastingDice: {},
    gnosis: makeGnosisValue({diceModifier: 1}),
    highestSpellArcanum: makeCharactersArcanum(ArcanaType.death),
    spendsWillpower: false,
    ...spellCaster,
  };
}
