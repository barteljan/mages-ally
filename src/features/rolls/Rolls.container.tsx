import {connect, MergeProps} from 'react-redux';
import {RollsScreen} from './Rolls.screen';
//import {AppState} from 'src/redux/AppState';
import {RollsProps} from './Rolls.props';

interface OwnProps {
  navigation: any;
}

interface StateProps {}

interface DispatchProps {}

const mapStateToProps = (/*state: AppState, ownProps: OwnProps*/): StateProps => {
  return {};
};

const mapDispatchToProps = {};

const mergeProps: MergeProps<
  StateProps,
  DispatchProps,
  OwnProps,
  RollsProps
> = (stateProps, dispatchProps, ownProps) => {
  return {
    navigation: ownProps.navigation,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(RollsScreen);
