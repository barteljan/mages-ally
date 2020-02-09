import {connect, MergeProps} from 'react-redux';
import {RollsScreen} from './Rolls.screen';
//import {AppState} from 'src/redux/AppState';
import {RollsProps} from './Rolls.props';
import {navigate} from '../../NavigationService';
import {Routes} from '../../Routes';

interface OwnProps {
  navigation: any;
}

interface StateProps {}

interface DispatchProps {}

const mapStateToProps = (/*state: AppState, ownProps: OwnProps*/): StateProps => {
  return {};
};

const mapDispatchToProps = {};

const addRoll = () => {
  navigate(Routes.addRoll);
};

const mergeProps: MergeProps<
  StateProps,
  DispatchProps,
  OwnProps,
  RollsProps
> = (stateProps, dispatchProps, ownProps) => {
  return {
    addRoll,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(RollsScreen);
