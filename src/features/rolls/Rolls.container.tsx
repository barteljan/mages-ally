import {connect, MergeProps} from 'react-redux';
import {RollsScreen} from './Rolls.screen';
import {RollsProps} from './Rolls.props';
import {Routes} from '../../navigation/Routes';
import {navigateToAction} from '../../navigation/Navigation.actions';
import {AppState} from '../../redux/AppState';
import {DiceRoll} from '../../rules/dice-roll/DiceRoll';
import {makeAllRollsSelector} from './Rolls.selector';
import {DiceRollConfig} from '../../rules/dice-roll/DiceRoll.config';
import {rollDiceAction, RollDiceAction} from '../roll-dice/RollDice.redux';
import {DiceRollContext} from '../../rules/DiceRollContext';
import uuid from 'uuid';

interface OwnProps {}

interface StateProps {
  rolls: DiceRoll[];
}

interface DispatchProps {
  addRoll: () => void;
  onReroll: (config: DiceRollConfig) => RollDiceAction;
}

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

const mapDispatchToProps: DispatchProps = {
  addRoll,
  onReroll: reroll,
};

const mergeProps: MergeProps<
  StateProps,
  DispatchProps,
  OwnProps,
  RollsProps
> = (stateProps, dispatchProps) => {
  return {
    addRoll: dispatchProps.addRoll,
    rolls: stateProps.rolls,
    onReroll: dispatchProps.onReroll,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(RollsScreen);
