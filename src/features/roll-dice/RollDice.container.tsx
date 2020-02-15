import {connect, MergeProps} from 'react-redux';
import {RollDiceScreen} from './RollDice.screen';
import {RollDiceProps} from './RollDice.props';
import {AppState} from '../../redux/AppState';
import {
  setNumberOfDiceAction,
  setRollAgainTypeAction,
  setExceptionalSuccessAtAction,
  rollDiceAction,
  RollDiceAction,
  SetExceptionalSuccessAtAction,
  SetRollAgainTypeAction,
  SetNumberOfDiceAction,
} from './RollDice.redux';
import {DiceRollAgainType} from '../../rules/dice-roll/DiceRollAgainType';
import {DiceRollConfig} from '../../rules/dice-roll/DiceRoll.config';
import {DiceRollContext} from '../../rules/DiceRollContext';
import {makeDiceRollConfig} from './helper/makeDiceRollConfig';

type OwnProps = {};

type StateProps = {
  numberOfDice: number;
  exceptionalSuccessAt: number;
  rollAgainType: DiceRollAgainType;
};

type DispatchProps = {
  setNumberOfDice: (dice: number) => SetNumberOfDiceAction;
  setRollAgainType: (type: DiceRollAgainType) => SetRollAgainTypeAction;
  setExceptionalSuccessAt: (at: number) => SetExceptionalSuccessAtAction;
  rollDice: (
    config: DiceRollConfig,
    context: DiceRollContext,
  ) => RollDiceAction;
};

const mapStateToProps = (state: AppState): StateProps => {
  return {
    numberOfDice: state.rollDice.numberOfDice,
    rollAgainType: state.rollDice.rollAgainType,
    exceptionalSuccessAt: state.rollDice.exceptionalSuccessAt,
  };
};

const mapDispatchToProps: DispatchProps = {
  setNumberOfDice: setNumberOfDiceAction,
  setRollAgainType: setRollAgainTypeAction,
  setExceptionalSuccessAt: setExceptionalSuccessAtAction,
  rollDice: rollDiceAction,
};

const mergeProps: MergeProps<
  StateProps,
  DispatchProps,
  OwnProps,
  RollDiceProps
> = (stateProps, dispatchProps) => {
  return {
    numberOfDice: stateProps.numberOfDice,
    rollAgainType: stateProps.rollAgainType,
    exceptionalSuccessAt: stateProps.exceptionalSuccessAt,
    setNumberOfDice: dispatchProps.setNumberOfDice,
    setRollAgainType: dispatchProps.setRollAgainType,
    setExceptionalSuccessAt: dispatchProps.setExceptionalSuccessAt,
    rollDice: () => {
      const config = makeDiceRollConfig(
        stateProps.numberOfDice,
        stateProps.rollAgainType,
        stateProps.exceptionalSuccessAt,
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
