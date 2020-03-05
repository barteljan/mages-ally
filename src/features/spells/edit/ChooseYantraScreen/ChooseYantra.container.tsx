import {connect, MergeProps} from 'react-redux';
import {BaseYantra, Yantra} from '../../../../rules/spells/yantra/yantra';
import {ChooseYantraScreen} from './ChooseYantra.screen';
import {ChooseYantraScreenProps} from './ChooseYantra.props';
import {Theme} from 'react-native-paper';
import {AppState} from '../../../../redux/AppState';
import {SectionListData} from 'react-native';
import {makeChoosableYantras} from '../../../../rules/spells/yantra/helper/makeChoosableYantras';
import {YantraType} from '../../../../rules/spells/yantra/Yantra.type';
import {selectedYantraAction, addCustomYantra} from '../../Spell.actions';

type OwnProps = {
  theme: Theme;
  route: {params: {parent: string}};
};

type StateProps = {
  yantras: SectionListData<BaseYantra<YantraType, number, string>>;
};

type DispatchProps = {
  didSelectYantra: (yantra: Yantra, parent: string) => void;
  addCustomYantra: (title: string, value: number, parent: string) => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mapStateToProps = (state: AppState): StateProps => {
  const yantras = makeChoosableYantras();
  //@ts-ignore
  return {yantras: yantras};
};

const mapDispatchToProps: DispatchProps = {
  didSelectYantra: selectedYantraAction,
  addCustomYantra: addCustomYantra,
};

const mergeProps: MergeProps<
  StateProps,
  DispatchProps,
  any,
  ChooseYantraScreenProps
> = (stateProps, dispatchProps, ownProps) => {
  return {
    theme: ownProps.theme,
    yantras: stateProps.yantras,
    parent: ownProps.route.params.parent,
    didSelectYantra: dispatchProps.didSelectYantra,
    addCustomYantra: dispatchProps.addCustomYantra,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ChooseYantraScreen);
