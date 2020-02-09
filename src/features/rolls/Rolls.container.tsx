import {connect, MergeProps} from 'react-redux';
import {RollsScreen} from './Rolls.screen';
import {RollsProps} from './Rolls.props';
import {Routes} from '../../navigation/Routes';
import {navigateToAction} from '../../navigation/Navigation.actions';

interface OwnProps {}

interface StateProps {}

interface DispatchProps {
  addRoll: () => void;
}

const mapStateToProps = (/*state: AppState, ownProps: OwnProps*/): StateProps => {
  return {};
};

const addRoll = () => {
  return navigateToAction(Routes.addRoll);
};

const mapDispatchToProps = {
  addRoll,
};

const mergeProps: MergeProps<
  StateProps,
  DispatchProps,
  OwnProps,
  RollsProps
> = (stateProps, dispatchProps) => {
  return {
    addRoll: dispatchProps.addRoll,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(RollsScreen);
