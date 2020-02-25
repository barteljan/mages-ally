import {connect, MergeProps} from 'react-redux';
import {EditSpellScreen} from './EditSpell.screen';
import {EditSpellProps} from './EditSpell.props';
import {SpellCastingConfig} from '../../../rules/spells/Spell.config';
import {AppState} from '../../../redux/AppState';
import {addedSpellCastingConfig, addedSpell} from './AddSpell.selectors';
import {
  setNumberValueAction,
  setStringValueAction,
  setBooleanValueAction,
  setSpellFactorLevelAction,
  setSpellFactorValueAction,
} from '../Spell.redux';
import {Theme} from 'react-native-paper';
import {SpellFactorType} from '../../../rules/spells/spell-factors/SpellFactor.type';
import {SpellFactorLevel} from '../../../rules/spells/spell-factors/SpellFactor.level';
import {Spell} from '../../../rules/spells/Spell';

type OwnProps = {
  theme: Theme;
};

type StateProps = {
  spellCastingConfig: SpellCastingConfig;
  spell: Spell;
};

type DispatchProps = {
  setValue: (identifier: string, value: number, parent: string) => void;
  setStringValue: (
    identifier: string,
    value: string | undefined,
    parent: string,
  ) => void;
  setBooleanValue: (identifier: string, value: boolean, parent: string) => void;
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

const mapStateToProps = (state: AppState): StateProps => {
  const config = addedSpellCastingConfig(state);
  const spell = addedSpell(state);
  return {
    spellCastingConfig: config!,
    spell: spell!,
  };
};

const mapDispatchToProps: DispatchProps = {
  setValue: setNumberValueAction,
  setStringValue: setStringValueAction,
  setBooleanValue: setBooleanValueAction,
  setSpellFactorLevel: setSpellFactorLevelAction,
  setSpellFactorValue: setSpellFactorValueAction,
};

const mergeProps: MergeProps<
  StateProps,
  DispatchProps,
  OwnProps,
  EditSpellProps
> = (stateProps, dispatchProps, ownProps) => {
  return {
    spellCastingConfig: stateProps.spellCastingConfig,
    spell: stateProps.spell,
    setValue: dispatchProps.setValue,
    setStringValue: dispatchProps.setStringValue,
    setBooleanValue: dispatchProps.setBooleanValue,
    setSpellFactorLevel: dispatchProps.setSpellFactorLevel,
    setSpellFactorValue: dispatchProps.setSpellFactorValue,
    theme: ownProps.theme,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(EditSpellScreen);
