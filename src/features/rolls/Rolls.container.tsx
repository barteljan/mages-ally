import {connect, MergeProps} from 'react-redux';
import {RollsScreen} from './Rolls.screen';
import {RollsProps} from './Rolls.props';
import {Routes} from '../../navigation/Routes';
import {navigateToAction} from '../../navigation/Navigation.actions';
import {AppState} from '../../redux/AppState';
import {DiceRoll} from '../../rules/dice-roll/DiceRoll';
import {makeAllRollsSelector} from './Rolls.selector';
import {DiceRollConfig} from '../../rules/dice-roll/DiceRoll.config';
import {
  rollDiceAction,
  setCurrentRoll,
  deleteRollAction,
} from '../roll-dice/RollDice.redux';
import {DiceRollContext} from '../../rules/DiceRollContext';
import uuid from 'uuid';
import {Theme} from 'react-native-paper';

type OwnProps = {
  theme: Theme;
};

type StateProps = {
  rolls: DiceRoll[];
};

type DispatchProps = {
  addRoll: () => void;
  onReroll: (config: DiceRollConfig) => void;
  itemSelected: (item: DiceRoll) => void;
  delete: (id: string) => void;
};

const allRollsSelector = makeAllRollsSelector();

const mapStateToProps = (state: AppState): StateProps => {
  const rolls: DiceRoll[] = allRollsSelector(state);
  return {rolls};
};

const addRoll = () => {
  return navigateToAction(Routes.addRoll);
};

const reroll = (config: DiceRollConfig) => {
  let newConfig: DiceRollConfig = {...config, id: uuid.v4()};
  return rollDiceAction(newConfig, DiceRollContext.rollsList);
};

const itemSelected = (item: DiceRoll) => {
  return setCurrentRoll(item, DiceRollContext.rollsList);
};

const deleteRoll = (id: string) => {
  return deleteRollAction(id, DiceRollContext.rollsList);
};

const mapDispatchToProps: DispatchProps = {
  addRoll,
  onReroll: reroll,
  itemSelected,
  delete: deleteRoll,
};

const mergeProps: MergeProps<StateProps, DispatchProps, any, RollsProps> = (
  stateProps,
  dispatchProps,
  ownProps,
) => {
  return {
    theme: ownProps.theme,
    addRoll: dispatchProps.addRoll,
    rolls: stateProps.rolls,
    onReroll: dispatchProps.onReroll,
    itemSelected: dispatchProps.itemSelected,
    delete: dispatchProps.delete,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(RollsScreen);
