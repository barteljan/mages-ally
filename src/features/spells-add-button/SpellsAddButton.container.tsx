import {connect, MergeProps} from 'react-redux';
import {AddButton} from '../../components/AddButton/AddButton';
import {AddButtonProps} from '../../components/AddButton/AddButton.props';
import {Routes} from '../../navigation/Routes';
import {navigateToAction} from '../../navigation/Navigation.actions';

type StateProps = {};

type DispatchProps = {
  add: () => void;
};

const mapStateToProps = (): StateProps => {
  return {};
};

const add = () => {
  return navigateToAction(Routes.addSpell);
};

const mapDispatchToProps = {
  add,
};

const mergeProps: MergeProps<StateProps, DispatchProps, any, AddButtonProps> = (
  stateProps,
  dispatchProps,
  ownProps,
) => {
  return {
    add: dispatchProps.add,
    theme: ownProps.theme,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(AddButton);
