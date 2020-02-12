import {connect, MergeProps} from 'react-redux';
import {RollDiceScreen} from './RollDice.screen';
import {RollDiceProps} from './RollDice.props';
import {AppState} from '../../redux/AppState';
import {
  setNumberOfDicesAction,
  setRollAgainTypeAction,
  setExceptionalSuccessAtAction,
  rollDiceAction,
  RollDiceAction,
  SetExceptionalSuccessAtAction,
  SetRollAgainTypeAction,
  SetNumberOfDicesAction,
} from './RollDice.redux';
import {DiceRollAgainType} from '../../rules/dice-roll/DiceRollAgainType';
import {DiceRollConfig} from '../../rules/dice-roll/DiceRoll.config';
import {DiceRollContext} from '../../rules/DiceRollContext';
import {makeDiceRollConfig} from './helper/makeDiceRollConfig';

interface OwnProps {}

interface StateProps {
  numberOfDices: number;
  exceptionalSuccessAt: number;
  rollAgainType: DiceRollAgainType;
}

interface DispatchProps {
  setNumberOfDices: (dices: number) => SetNumberOfDicesAction;
  setRollAgainType: (type: DiceRollAgainType) => SetRollAgainTypeAction;
  setExceptionalSuccessAt: (at: number) => SetExceptionalSuccessAtAction;
  rollDice: (
    config: DiceRollConfig,
    context: DiceRollContext,
  ) => RollDiceAction;
}

const mapStateToProps = (state: AppState): StateProps => {
  return {
    numberOfDices: state.rollDice.numberOfDices,
    rollAgainType: state.rollDice.rollAgainType,
    exceptionalSuccessAt: state.rollDice.exceptionalSuccessAt,
  };
};

const mapDispatchToProps: DispatchProps = {
  setNumberOfDices: setNumberOfDicesAction,
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
    numberOfDices: stateProps.numberOfDices,
    rollAgainType: stateProps.rollAgainType,
    exceptionalSuccessAt: stateProps.exceptionalSuccessAt,
    setNumberOfDices: dispatchProps.setNumberOfDices,
    setRollAgainType: dispatchProps.setRollAgainType,
    setExceptionalSuccessAt: dispatchProps.setExceptionalSuccessAt,
    rollDice: () => {
      const config = makeDiceRollConfig(
        stateProps.numberOfDices,
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
