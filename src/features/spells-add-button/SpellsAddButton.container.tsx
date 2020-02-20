import {connect, MergeProps} from 'react-redux';
import {SpellsAddButton} from './SpellsAddButton';
import {SpellsAddButtonProps} from './SpellsAddButton.props';
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
  return navigateToAction(Routes.addSpell);
};

const mapDispatchToProps = {
  addRoll,
};

const mergeProps: MergeProps<
  StateProps,
  DispatchProps,
  OwnProps,
  SpellsAddButtonProps
> = (stateProps, dispatchProps) => {
  return {
    addRoll: dispatchProps.addRoll,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(SpellsAddButton);
