import {connect, MergeProps} from 'react-redux';
import {EditSpellScreen} from './EditSpell.screen';
import {EditSpellProps} from './EditSpell.props';
import {SpellCastingConfig} from '../../../rules/spells/Spell.config';
import {AppState} from '../../../redux/AppState';
import {
  addedSpellCastingConfig,
  addedSpell,
  spellCastingConfigFor,
  spellFor,
} from '../Spell.selectors';
import {
  setNumberValueAction,
  setStringValueAction,
  setBooleanValueAction,
  setSpellFactorLevelAction,
  setSpellFactorValueAction,
  deleteYantraAction,
  setYantraValueAction,
  saveSpellAction,
} from '../Spell.actions';
import {Theme} from 'react-native-paper';
import {SpellFactorType} from '../../../rules/spells/spell-factors/SpellFactor.type';
import {SpellFactorLevel} from '../../../rules/spells/spell-factors/SpellFactor.level';
import {Spell} from '../../../rules/spells/Spell';
import {navigateToAction} from '../../../navigation/Navigation.actions';
import {Routes} from '../../../navigation/Routes';

type OwnProps = {
  theme: Theme;
  navigation: any;
  route: {params: {id?: string}};
};

type StateProps = {
  spellCastingConfig: SpellCastingConfig;
  spell: Spell;
  showSave: boolean;
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
  save: (id: string) => void;
  deleteYantra: (id: string, parent: string) => void;
  chooseYantra: (parent: string) => void;
  setYantraValue: (identifier: string, value: number, parent: string) => void;
  rollDice: (id: string) => void;
};

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => {
  let config: SpellCastingConfig | undefined;
  let spell: Spell | undefined;

  let id: string | undefined = ownProps.route.params.id;

  if (!id) {
    config = addedSpellCastingConfig(state);
    spell = addedSpell(state);
  } else {
    config = spellCastingConfigFor(state, id);
    spell = spellFor(state, id);
  }

  return {
    spellCastingConfig: config!,
    spell: spell!,
    showSave: !id,
  };
};

const chooseYantra = (parent: string) =>
  navigateToAction(Routes.chooseYantras, {parent});

const rollDice = (id: string) => {
  return navigateToAction(Routes.rollSpellDice, {id});
};

const mapDispatchToProps: DispatchProps = {
  setValue: setNumberValueAction,
  setStringValue: setStringValueAction,
  setBooleanValue: setBooleanValueAction,
  setSpellFactorLevel: setSpellFactorLevelAction,
  setSpellFactorValue: setSpellFactorValueAction,
  deleteYantra: deleteYantraAction,
  chooseYantra,
  setYantraValue: setYantraValueAction,
  save: saveSpellAction,
  rollDice,
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
    deleteYantra: dispatchProps.deleteYantra,
    chooseYantra: dispatchProps.chooseYantra,
    setYantraValue: dispatchProps.setYantraValue,
    save: dispatchProps.save,
    theme: ownProps.theme,
    navigation: ownProps.navigation,
    showSave: stateProps.showSave,
    rollDice: dispatchProps.rollDice,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(EditSpellScreen);
