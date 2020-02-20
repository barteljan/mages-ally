import {connect, MergeProps} from 'react-redux';
import {AddSpellScreen} from './AddSpell.screen';
import {AddSpellProps} from './AddSpell.props';
import {SpellCastingConfig} from '../../rules/spells/Spell.config';
import {AppState} from '../../redux/AppState';
import {spellCastingConfig} from './AddSpell.selectors';
import {setNumberValueAction, setStringValueAction} from './AddSpell.redux';

type OwnProps = {};

type StateProps = {
  spellCastingConfig: SpellCastingConfig;
};

type DispatchProps = {
  setValue: (identifier: string, value: number) => void;
  setStringValue: (identifier: string, value: string | undefined) => void;
};

const mapStateToProps = (state: AppState): StateProps => {
  const config = spellCastingConfig(state);

  return {
    spellCastingConfig: config,
  };
};

const mapDispatchToProps: DispatchProps = {
  setValue: setNumberValueAction,
  setStringValue: setStringValueAction,
};

const mergeProps: MergeProps<
  StateProps,
  DispatchProps,
  OwnProps,
  AddSpellProps
> = (stateProps, dispatchProps) => {
  return {
    spellCastingConfig: stateProps.spellCastingConfig,
    setValue: dispatchProps.setValue,
    setStringValue: dispatchProps.setStringValue,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(AddSpellScreen);
