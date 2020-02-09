import {connect, MergeProps} from 'react-redux';
import {AddRollScreen} from './AddRoll.screen';
//import {AppState} from 'src/redux/AppState';
import {AddRollProps} from './AddRollProps';

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
  AddRollProps
> = (stateProps, dispatchProps, ownProps) => {
  return {
    navigation: ownProps.navigation,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(AddRollScreen);
