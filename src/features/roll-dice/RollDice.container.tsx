import {connect, MergeProps} from 'react-redux';
import {RollDiceScreen} from './RollDice.screen';
import {RollDiceProps} from './RollDice.props';
import {AppState} from '../../redux/AppState';
import {
  setNumberOfDiceAction,
  setRollAgainTypeAction,
  setExceptionalSuccessAtAction,
  rollDiceAction,
  clearCurrentRollAction,
  setRollAsChanceDice,
} from './RollDice.redux';
import {DiceRollAgainType} from '../../rules/dice-roll/DiceRollAgainType';
import {DiceRollConfig} from '../../rules/dice-roll/DiceRoll.config';
import {DiceRollContext} from '../../rules/DiceRollContext';
import {makeDiceRollConfig} from './helper/makeDiceRollConfig';
import {Action} from 'typesafe-actions';
import {Theme} from 'react-native-paper';
import {DiceRoll} from '../../rules/dice-roll/DiceRoll';
import {currentRoll} from './RollDice.selector';

type OwnProps = {
  theme: Theme;
  navigation: any;
};

type StateProps = {
  currentRoll?: DiceRoll;
  numberOfDice: number;
  exceptionalSuccessAt: number;
  rollAgainType: DiceRollAgainType;
  rollOneDiceAsChanceDice: boolean;
};

type DispatchProps = {
  setNumberOfDice: (dice: number) => Action;
  setRollAgainType: (type: DiceRollAgainType) => Action;
  setExceptionalSuccessAt: (at: number) => Action;
  rollDice: (config: DiceRollConfig, context: DiceRollContext) => Action;
  clearCurrentRoll: () => void;
  setRollOneDiceAsChanceDice: (rollAsChanceDice: boolean) => void;
};

const mapStateToProps = (state: AppState): StateProps => {
  return {
    currentRoll: currentRoll(state),
    numberOfDice: state.rollDice.numberOfDice,
    rollAgainType: state.rollDice.rollAgainType,
    exceptionalSuccessAt: state.rollDice.exceptionalSuccessAt,
    rollOneDiceAsChanceDice: state.rollDice.rollOneDiceAsChanceDice,
  };
};

const mapDispatchToProps: DispatchProps = {
  setNumberOfDice: setNumberOfDiceAction,
  setRollAgainType: setRollAgainTypeAction,
  setExceptionalSuccessAt: setExceptionalSuccessAtAction,
  rollDice: rollDiceAction,
  clearCurrentRoll: clearCurrentRollAction,
  setRollOneDiceAsChanceDice: setRollAsChanceDice,
};

const mergeProps: MergeProps<
  StateProps,
  DispatchProps,
  OwnProps,
  RollDiceProps
> = (stateProps, dispatchProps, ownProps) => {
  return {
    theme: ownProps.theme,
    numberOfDice: stateProps.numberOfDice,
    rollAgainType: stateProps.rollAgainType,
    exceptionalSuccessAt: stateProps.exceptionalSuccessAt,
    rollOneDiceAsChanceDice: stateProps.rollOneDiceAsChanceDice,
    setNumberOfDice: dispatchProps.setNumberOfDice,
    setRollAgainType: dispatchProps.setRollAgainType,
    setExceptionalSuccessAt: dispatchProps.setExceptionalSuccessAt,
    currentRoll: stateProps.currentRoll,
    clearCurrentRoll: dispatchProps.clearCurrentRoll,
    navigation: ownProps.navigation,
    setRollOneDiceAsChanceDice: dispatchProps.setRollOneDiceAsChanceDice,
    rollDice: () => {
      const config = makeDiceRollConfig(
        stateProps.numberOfDice,
        stateProps.rollAgainType,
        stateProps.exceptionalSuccessAt,
        stateProps.rollOneDiceAsChanceDice,
      );
      dispatchProps.rollDice(config, DiceRollContext.rollDice);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(RollDiceScreen);
