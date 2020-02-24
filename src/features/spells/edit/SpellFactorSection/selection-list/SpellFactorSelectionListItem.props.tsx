import {SpellFactorType} from '../../../../../rules/spells/spell-factors/SpellFactor.type';
import {SpellFactor} from '../../../../../rules/spells/spell-factors/SpellFactor';
export type SpellFactorSelectionListItemProps = {
  spellFactor: SpellFactor;
  highestArcanumValue: number;
  primaryFactor: SpellFactorType;
  gnosis: number;
  value: number;
  didSelectValue: (value: number) => void;
};
