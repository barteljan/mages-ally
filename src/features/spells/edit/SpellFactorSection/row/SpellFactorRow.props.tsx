import {SpellFactorType} from '../../../../../rules/spells/spell-factors/SpellFactor.type';
import {ViewStyle} from 'react-native';
import {SpellFactorLevel} from '../../../../../rules/spells/spell-factors/SpellFactor.level';
import {Theme} from 'react-native-paper';
import {SpellFactor} from 'src/rules/spells/spell-factors/SpellFactor';
export type SpellFactorRowProps = {
  factor: SpellFactor;
  gnosis: number;
  primaryFactor: SpellFactorType;
  highestArcanumValue: number;
  containerStyle?: ViewStyle;
  theme: Theme;
  parent: string;
  setSpellFactorLevel: (
    factor: SpellFactorType,
    level: SpellFactorLevel,
    parent: string,
  ) => void;
  setSpellFactorValue: (
    factor: SpellFactorType,
    value: number,
    parent: string,
  ) => void;
};
