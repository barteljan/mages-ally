/* eslint-disable prettier/prettier */
import {Theme} from 'react-native-paper';
import {AppState} from '../../redux/AppState';
import {MergeProps, connect} from 'react-redux';
import {CharactersScreen} from './Characters.screen';
import {CharactersScreenProps} from './Characters.props';

type OwnProps = {
  theme: Theme;
};

type StateProps = {};

type DispatchProps = {};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mapStateToProps = (state: AppState): StateProps => {
  return {};
};

const mapDispatchToProps: DispatchProps = {};

const mergeProps: MergeProps<
  StateProps,
  DispatchProps,
  OwnProps,
  CharactersScreenProps
> = (stateProps, dispatchProps, ownProps) => {
  return {
    theme: ownProps.theme,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(CharactersScreen);
