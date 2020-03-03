import {Theme} from 'react-native-paper';
import {AppState} from 'src/redux/AppState';
import {MergeProps, connect} from 'react-redux';
import {SpellRollScreenProps} from './SpellRoll.props';
import {SpellRollScreen} from './SpellRoll.screen';
import {
  spellCastingConfigFor,
  spellFor,
  spellRollsFor,
} from '../Spell.selectors';
import {SpellCastingConfig} from '../../../rules/spells/Spell.config';
import {Spell} from '../../../rules/spells/Spell';
import {navigateToAction} from '../../../navigation/Navigation.actions';
import {Routes} from '../../../navigation/Routes';
import {
  setStringValueAction,
  setNumberValueAction,
  SpellRolls,
  setBooleanValueAction,
} from '../Spell.redux';

type OwnProps = {
  theme: Theme;
  route: {params: {id: string}};
  navigation: any;
};

type StateProps = {
  config: SpellCastingConfig;
  spell: Spell;
  roll: SpellRolls;
};

type DispatchProps = {
  showSpell: (id: string) => void;
  setValue: (identifier: string, value: number, parent: string) => void;
  setStringValue: (
    identifier: string,
    value: string | undefined,
    parent: string,
  ) => void;
  setBooleanValue: (identifier: string, value: boolean, parent: string) => void;
};

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => {
  const id: string | undefined = ownProps.route.params.id;

  const config: SpellCastingConfig = spellCastingConfigFor(state, id)!;
  const spell: Spell = spellFor(state, id)!;
  const roll: SpellRolls = spellRollsFor(state, id)!;

  return {config, spell, roll};
};

const showSpell = (id: string) => {
  return navigateToAction(Routes.editSpell, {id});
};

const mapDispatchToProps: DispatchProps = {
  showSpell,
  setValue: setNumberValueAction,
  setStringValue: setStringValueAction,
  setBooleanValue: setBooleanValueAction,
};

const mergeProps: MergeProps<
  StateProps,
  DispatchProps,
  any,
  SpellRollScreenProps
> = (stateProps, dispatchProps, ownProps) => {
  return {
    theme: ownProps.theme,
    config: stateProps.config,
    setValue: dispatchProps.setValue,
    setStringValue: dispatchProps.setStringValue,
    setBooleanValue: dispatchProps.setBooleanValue,
    spell: stateProps.spell,
    showSpell: dispatchProps.showSpell,
    roll: stateProps.roll,
    navigation: ownProps.navigation,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(SpellRollScreen);
