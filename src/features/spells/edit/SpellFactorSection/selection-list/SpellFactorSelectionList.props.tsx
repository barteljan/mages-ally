import {SpellFactorType} from '../../../../../rules/spells/spell-factors/SpellFactor.type';
import {SpellFactor} from '../../../../../rules/spells/spell-factors/SpellFactor';
import {LayoutRectangle} from 'react-native';

export type SpellFactorSelectionListProps = {
  parent: string;
  spellFactor: SpellFactor;
  highestArcanumValue: number;
  primaryFactor: SpellFactorType;
  gnosis: number;
  close: () => void;
  onLayout: (rect: LayoutRectangle) => void;
  setSpellFactorValue: (
    factor: SpellFactorType,
    value: number,
    parent: string,
  ) => void;
};
