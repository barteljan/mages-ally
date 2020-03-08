/* eslint-disable prettier/prettier */
import {Theme} from 'react-native-paper';
import {SpellState} from './Spell.state';
import {AppState} from '../../redux/AppState';
import {createSelector} from 'reselect';
import {SpellsProps} from './Spells.props';
import {MergeProps, connect} from 'react-redux';
import {SpellsScreen} from './Spells.screen';
import {SpellStatus} from './Spell.status';
import {navigateToAction} from '../../navigation/Navigation.actions';
import {Routes} from '../../navigation/Routes';
import {deleteSpellAction} from './Spell.actions';

type OwnProps = {
  theme: Theme;
};

type StateProps = {
  spells: SpellState[];
};

type DispatchProps = {
  showSpell: (id: string) => void;
  rollDice: (id: string) => void;
  delete: (id: string) => void;
};

const spellsSelector = (state: AppState) => state.spells.spells;

const spellsList = createSelector(spellsSelector, spells => {
  let spellList: SpellState[] = [];

  for (let key in spells) {
    const spell = spells[key];
    if (spell.status !== SpellStatus.new) {
      spellList.push(spell);
    }
  }
  return spellList;
});

const mapStateToProps = (state: AppState): StateProps => {
  return {
    spells: spellsList(state),
  };
};

const showSpell = (id: string) => {
  return navigateToAction(Routes.editSpell, {id});
};

const rollDice = (id: string) => {
  return navigateToAction(Routes.rollSpellDice, {id});
};

const mapDispatchToProps: DispatchProps = {
  showSpell,
  rollDice,
  delete: deleteSpellAction,
};

const mergeProps: MergeProps<
  StateProps,
  DispatchProps,
  OwnProps,
  SpellsProps
> = (stateProps, dispatchProps, ownProps) => {
  return {
    theme: ownProps.theme,
    spells: stateProps.spells,
    showSpell: dispatchProps.showSpell,
    rollDice: dispatchProps.rollDice,
    delete: dispatchProps.delete,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(SpellsScreen);
