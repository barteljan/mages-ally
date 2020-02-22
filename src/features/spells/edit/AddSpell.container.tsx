import {connect, MergeProps} from 'react-redux';
import {EditSpellScreen} from './EditSpell.screen';
import {EditSpellProps} from './EditSpell.props';
import {SpellCastingConfig} from '../../../rules/spells/Spell.config';
import {AppState} from '../../../redux/AppState';
import {addedSpellCastingConfig} from './AddSpell.selectors';
import {
  setNumberValueAction,
  setStringValueAction,
  setBooleanValueAction,
} from '../Spell.redux';
import {Theme} from 'react-native-paper';

type OwnProps = {
  theme: Theme;
};

type StateProps = {
  spellCastingConfig: SpellCastingConfig;
};

type DispatchProps = {
  setValue: (identifier: string, value: number, parent: string) => void;
  setStringValue: (
    identifier: string,
    value: string | undefined,
    parent: string,
  ) => void;
  setBooleanValue: (identifier: string, value: boolean, parent: string) => void;
};

const mapStateToProps = (state: AppState): StateProps => {
  const config = addedSpellCastingConfig(state);

  return {
    spellCastingConfig: config!,
  };
};

const mapDispatchToProps: DispatchProps = {
  setValue: setNumberValueAction,
  setStringValue: setStringValueAction,
  setBooleanValue: setBooleanValueAction,
};

const mergeProps: MergeProps<
  StateProps,
  DispatchProps,
  OwnProps,
  EditSpellProps
> = (stateProps, dispatchProps, ownProps) => {
  return {
    spellCastingConfig: stateProps.spellCastingConfig,
    setValue: dispatchProps.setValue,
    setStringValue: dispatchProps.setStringValue,
    setBooleanValue: dispatchProps.setBooleanValue,
    theme: ownProps.theme,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(EditSpellScreen);
