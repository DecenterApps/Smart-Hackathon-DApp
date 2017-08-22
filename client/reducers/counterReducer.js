import INCREMENT_COUNTER from '../actions/types';

const INITIAL_STATE = {
  counter: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return { ...state, counter: state.counter + 1 };

    default:
      return state;
  }
};
