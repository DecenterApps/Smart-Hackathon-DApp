import { PHASE_FETCH, PHASE_FETCH_SUCCESS, PHASE_FETCH_ERROR } from '../actions/types';

const INITIAL_STATE = {
  phase: 0,
  isFetching: false,
  phaseError: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PHASE_FETCH:
      return {
        ...state,
        isFetching: true
      };

    case PHASE_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        phase: action.payload.phase
      };

    case PHASE_FETCH_ERROR:
      return {
        ...state,
        isFetching: false,
        phaseError: 'FAILED FETCHING'
      };

    default:
      return state;
  }
};
