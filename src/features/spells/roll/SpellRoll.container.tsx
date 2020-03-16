import {Theme} from 'react-native-paper';
import {AppState} from '../../../redux/AppState';
import {MergeProps, connect} from 'react-redux';
import {SpellRollScreenProps} from './SpellRoll.props';
import {SpellRollScreen} from './SpellRoll.screen';
import {
  spellCastingConfigFor,
  spellFor,
  spellRollStateFor,
  spellRollInfoConfigFor,
} from '../Spell.selectors';
import {SpellCastingConfig} from '../../../rules/spells/Spell.config';
import {Spell} from '../../../rules/spells/Spell';
import {navigateToAction} from '../../../navigation/Navigation.actions';
import {Routes} from '../../../navigation/Routes';
import {
  setStringValueAction,
  setNumberValueAction,
  setBooleanValueAction,
  rollSpellDiceAction,
} from '../Spell.actions';
import {SpellRollState} from '../Spell.state';
import {SpellRollInfoConfig} from './SpellRollInfo/SpellRollInfo.config';

type OwnProps = {
  theme: Theme;
  route: {params: {id: string}};
  navigation: any;
};

type StateProps = {
  config: SpellCastingConfig;
  spell: Spell;
  roll: SpellRollState;
  spellRollInfoConfig: SpellRollInfoConfig | undefined;
};

type DispatchProps = {
  showSpell: (id: string) => void;
  setValue: (
    identifier: string,
    value: number | undefined,
    parent: string,
  ) => void;
  setStringValue: (
    identifier: string,
    value: string | undefined,
    parent: string,
  ) => void;
  setBooleanValue: (
    identifier: string,
    value: boolean | undefined,
    parent: string,
  ) => void;
  rollDice: (spellId: string) => void;
};

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => {
  const id: string | undefined = ownProps.route.params.id;

  const config: SpellCastingConfig = spellCastingConfigFor(state, id)!;
  const spell: Spell = spellFor(state, id)!;
  const roll: SpellRollState = spellRollStateFor(state, id)!;

  let spellRollInfoConfig:
    | SpellRollInfoConfig
    | undefined = spellRollInfoConfigFor(state, id);
  return {config, spell, roll, spellRollInfoConfig};
};

const showSpell = (id: string) => {
  return navigateToAction(Routes.editSpell, {id});
};

const mapDispatchToProps: DispatchProps = {
  showSpell,
  setValue: setNumberValueAction,
  setStringValue: setStringValueAction,
  setBooleanValue: setBooleanValueAction,
  rollDice: rollSpellDiceAction,
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
    rollDice: dispatchProps.rollDice,
    spellRollInfoConfig: stateProps.spellRollInfoConfig,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(SpellRollScreen);
