import {
  SpellSpecification,
  SpellSpecificationAdditionalSpecs,
} from '../Spell.config.specification';
import StringMap from '../../../data-types/StringMap';
import {BaseDiceModifier} from '../../model/BaseDiceModifier';
import {
  SpellModifiersFromSpellFactorsReturn,
  spellModifiersFromSpellFactors,
} from './spellModifiersFromSpellFactors';
import {CharactersArcanum} from 'src/rules/character/CharactersArcanum';
import {SpellFactorType} from '../spell-factors/SpellFactor.type';
import {YantraType} from '../yantra/Yantra.type';
import {Yantra} from '../yantra/yantra';
import {makeModifierIdForCustomYantra} from '../yantra/helper/makeModifierIdForCustomYantra';
import {
  makeExtraReachValue,
  ExtraReachValue,
} from '../spell-values/ExtraReachValue';
import {SpellValueIds} from '../spell-values/SpellValueIds';
import {BaseReachModifier} from 'src/rules/model/BaseReachModifier';
import {
  makeSymphaticRangeValue,
  SymphaticRangeValue,
} from '../spell-values/SympaticRangeValue';
import {BaseManaModifier} from 'src/rules/model/BaseManaModifier';
import {
  makeTemporalSympathyValue,
  TemporalSympathyValue,
} from '../spell-values/TemporalSympathyValue';

export function spellModifiersFromSpecification(
  highestArcanum: CharactersArcanum,
  specification: SpellSpecification,
  modifiersFromFactors: (
    highestArcanum: CharactersArcanum,
    primaryFactor: SpellFactorType,
    additionalSpecs: SpellSpecificationAdditionalSpecs,
    factors: SpellSpecification['spellFactors'],
  ) => SpellModifiersFromSpellFactorsReturn = spellModifiersFromSpellFactors,
): SpellModifiersFromSpecificationResult {
  let modifier: StringMap<
    BaseDiceModifier | BaseReachModifier | BaseManaModifier
  > = modifiersFromFactors(
    highestArcanum,
    specification.primaryFactor,
    specification.additionalSpecs,
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

  if (specification.additionalSpecs.extraReach) {
    const extraReach = makeExtraReachValue({
      reachModifier: specification.additionalSpecs.extraReach,
    });
    modifier[extraReach.id] = extraReach;
  }

  if (specification.additionalSpecs.sympatheticRange) {
    const sympathicRange = makeSymphaticRangeValue({manaModifier: 1});
    modifier[sympathicRange.id] = sympathicRange;
  }

  if (specification.additionalSpecs.temporalSympathy) {
    const temporalSympathy = makeTemporalSympathyValue({manaModifier: 1});
    modifier[temporalSympathy.id] = temporalSympathy;
  }

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

export type SpellModifiersFromSpecificationResult = SpellModifiersFromSpellFactorsReturn &
  YantrasModifierResult & {
    [SpellValueIds.extraReach]: ExtraReachValue;
    [SpellValueIds.symphaticRange]: SymphaticRangeValue;
    [SpellValueIds.temporalSympathy]: TemporalSympathyValue;
  };
