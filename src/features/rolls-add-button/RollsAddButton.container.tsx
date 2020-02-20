import {connect, MergeProps} from 'react-redux';
import {RollsAddButton} from './RollsAddButton';
import {RollsAddButtonProps} from './RollsAddButton.props';
import {Routes} from '../../navigation/Routes';
import {navigateToAction} from '../../navigation/Navigation.actions';

type OwnProps = {};

type StateProps = {};

type DispatchProps = {
  addRoll: () => void;
};

const mapStateToProps = (): StateProps => {
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
  RollsAddButtonProps
> = (stateProps, dispatchProps) => {
  return {
    addRoll: dispatchProps.addRoll,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(RollsAddButton);
