import {
  CharactersArcanum,
  makeCharactersArcanum,
} from '../character/CharactersArcanum';
import StringMap from '../../data-types/StringMap';
import {BaseDiceModifier} from '../model/BaseDiceModifier';
import {GnosisValue, makeGnosisValue} from '../character/GnosisValue';
import {ArcanaType} from './arcana/Arcana.type';
import {GameValueType} from '../../GameValueTypes';

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
    highestSpellArcanum: makeCharactersArcanum(ArcanaType.death, {
      diceModifier: 1,
    }),
    spendsWillpower: false,
    ...spellCaster,
  };
}

export enum DefaultAdditionalDiceModifier {
  default = 'default',
}

export function makeDefaultAdditionalSpellCastingDice(
  partial?: Partial<BaseDiceModifier>,
): BaseDiceModifier {
  return {
    id: DefaultAdditionalDiceModifier.default,
    type: GameValueType.additionalDiceModifier,
    diceModifier: 0,
    ...partial,
  };
}
