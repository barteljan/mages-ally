import LocalizedStrings from 'react-native-localization';
import {SpellFactorLevel} from '../SpellFactor.level';
import {PotencyRules, makePotencyRules} from './potency.rules';
import {SpellFactorType} from '../SpellFactor.type';
import {spellFactorName} from '../SpellFactor.strings';
export type SpellFactorPotencyStrings = {
  dice: string;
};

export function spellFactorLabelPotency(
  level: SpellFactorLevel,
  value: number,
  primaryFactor: SpellFactorType,
  highestArcanumValue: number,
  addDices: boolean,
  rules: PotencyRules = makePotencyRules(
    11,
    primaryFactor,
    highestArcanumValue,
  ),
) {
  let suffix: string = ' (';
  let diceModifier: number;
  switch (level) {
    case SpellFactorLevel.standard:
      diceModifier = rules.standard[value].diceModifier;
      break;
    case SpellFactorLevel.advanced:
      diceModifier = rules.advanced[value].diceModifier;
      break;
  }
  suffix +=
    diceModifier === 0
      ? '-0 ' + potencyLocalization.dice + ')'
      : diceModifier + ' ' + potencyLocalization.dice + ')';

  if (!addDices) {
    suffix = '';
  }

  return spellFactorName(SpellFactorType.potency) + ' ' + (value + 1) + suffix;
}

export const potencyLocalization = new LocalizedStrings<
  SpellFactorPotencyStrings
>({
  en: {
    dice: 'dice',
  },
});
