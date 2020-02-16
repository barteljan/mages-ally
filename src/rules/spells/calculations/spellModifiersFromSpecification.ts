import {SpellSpecification} from '../Spell.config.specification';
import StringMap from '../../../data-types/StringMap';
import {BaseDiceModifier} from '../../../data-types/BaseDiceModifier';
import {
  SpellModifiersFromSpellFactorsReturn,
  spellModifiersFromSpellFactors,
} from './spellModifiersFromSpellFactors';
import {CharactersArcanum} from 'src/rules/character/CharactersArcanum';
import {SpellFactorType} from '../spell-factors/SpellFactor.type';
import {YantraType} from '../yantra/Yantra.type';
import {Yantra} from '../yantra/yantra';
import {makeModifierIdForCustomYantra} from '../yantra/helper/makeModifierIdForCustomYantra';

export function spellModifiersFromSpecification(
  highestArcanum: CharactersArcanum,
  specification: SpellSpecification,
  modifiersFromFactors: (
    highestArcanum: CharactersArcanum,
    primaryFactor: SpellFactorType,
    factors: SpellSpecification['spellFactors'],
  ) => SpellModifiersFromSpellFactorsReturn = spellModifiersFromSpellFactors,
): SpellModifiersFromSpecificationResult {
  let modifier: StringMap<BaseDiceModifier> = modifiersFromFactors(
    highestArcanum,
    specification.primaryFactor,
    specification.spellFactors,
  );

  specification.yantras.forEach(yantra => {
    if (yantra.yantraType === YantraType.custom) {
      const id = makeModifierIdForCustomYantra(yantra);
      modifier[id] = yantra;
    } else {
      modifier[yantra.id] = yantra;
    }
  });

  return (modifier as unknown) as SpellModifiersFromSpecificationResult;
}

type YantrasModifierResult = {
  [YantraType.demesne]?: Yantra;
  [YantraType.location]?: Yantra;
  [YantraType.verge]?: Yantra;
  [YantraType.roteSkill]?: Yantra;
  [YantraType.concentration]?: Yantra;
  [YantraType.highSpeech]?: Yantra;
  [YantraType.runes]?: Yantra;
  [YantraType.dedicatedTool]?: Yantra;
  [YantraType.pathTool]?: Yantra;
  [YantraType.orderTool]?: Yantra;
  [YantraType.materialSympathy]?: Yantra;
  [YantraType.representationalSympathy]?: Yantra;
  [YantraType.symbolicSympathy]?: Yantra;
  [YantraType.sacrament]?: Yantra;
  [YantraType.rareSacrament]?: Yantra;
  [YantraType.otherworldlySacrament]?: Yantra;
  [YantraType.persona]?: Yantra;
  [YantraType.custom]?: Yantra;
  [id: string]: Yantra | undefined;
};

type SpellModifiersFromSpecificationResult = SpellModifiersFromSpellFactorsReturn &
  YantrasModifierResult & {};
