import {SpellFactorType} from '../../../../../rules/spells/spell-factors/SpellFactor.type';
import {ViewStyle} from 'react-native';
import {SpellFactorLevel} from '../../../../../rules/spells/spell-factors/SpellFactor.level';
import {Theme} from 'react-native-paper';
export type SpellFactorRowProps = {
  type: SpellFactorType;
  value: number;
  level: SpellFactorLevel;
  gnosis: number;
  primaryFactor: SpellFactorType;
  highestArcanumValue: number;
  containerStyle?: ViewStyle;
  theme: Theme;
  parent: string;
  standardComponent?: Element;
  advancedComponent?: Element;
  setSpellFactorLevel: (
    factor: SpellFactorType,
    level: SpellFactorLevel,
    parent: string,
  ) => void;
};
