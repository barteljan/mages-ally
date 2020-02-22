import {connect, MergeProps} from 'react-redux';
import {Routes} from '../../../navigation/Routes';
import {navigateToAction} from '../../../navigation/Navigation.actions';
import {AddButton} from '../../../components/AddButton/AddButton';
import {AddButtonProps} from '../../../components/AddButton/AddButton.props';
import {Theme} from 'react-native-paper';

type OwnProps = {
  theme: Theme;
};

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

const mergeProps: MergeProps<StateProps, DispatchProps, any, AddButtonProps> = (
  stateProps,
  dispatchProps,
  ownProps,
) => {
  return {
    add: dispatchProps.addRoll,
    theme: ownProps.theme,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(AddButton);
