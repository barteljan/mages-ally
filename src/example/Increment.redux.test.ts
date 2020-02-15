import {createAction, ActionType} from 'typesafe-actions';
import produce from 'immer';

type CounterState = {
  counter: number;
};

enum IncrementActionTypes {
  increment = 'increment',
  decrement = 'decrement',
}

const increment = createAction(
  IncrementActionTypes.increment,
  (inc: number) => inc,
)();

const decrementBuilder = createAction(
  IncrementActionTypes.decrement,
  (inc: number) => inc,
);
const decrement = decrementBuilder();

const actions = {
  increment,
  decrement,
};

type RootAction = ActionType<typeof actions>;

const counterReducer = produce((draft: CounterState, action: RootAction) => {
  switch (action.type) {
    case IncrementActionTypes.increment:
      draft.counter += action.payload;
      break;
    case IncrementActionTypes.decrement:
      draft.counter -= action.payload;
      break;
  }
});

test('increment action', () => {
  const incrementOneAction = increment(1);
  expect(incrementOneAction.type).toBe(IncrementActionTypes.increment);
  expect(incrementOneAction.payload).toBe(1);

  const decrementTwoAction = decrement(2);
  expect(decrementTwoAction.type).toBe(IncrementActionTypes.decrement);
  expect(decrementTwoAction.payload).toBe(2);

  const state: CounterState = {counter: 0};
  const stateOne = counterReducer(state, incrementOneAction);
  expect(stateOne.counter).toBe(1);

  const stateMinusTwo = counterReducer(state, decrementTwoAction);
  expect(stateMinusTwo.counter).toBe(-2);
});
