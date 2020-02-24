import {SpellFactorType} from '../../../../../rules/spells/spell-factors/SpellFactor.type';
import {SpellFactorLevel} from '../../../../../rules/spells/spell-factors/SpellFactor.level';
import {Theme} from 'react-native-paper';

export type SpellfactorOverlayProps = {
  isVisible: boolean;
  theme: Theme;
  factor: SpellFactorType;
  level: SpellFactorLevel;
  identifier: string;
  parent: string;
  height: number;
  standardComponent?: Element;
  advancedComponent?: Element;
  onBackdropPress: () => void;
  setSpellFactorLevel: (
    factor: SpellFactorType,
    level: SpellFactorLevel,
    parent: string,
  ) => void;
};
