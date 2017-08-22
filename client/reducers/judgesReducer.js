import { JUDGES_FETCH, JUDGES_SUCCESS, JUDGES_ERROR } from '../actions/types';


const INITIAL_STATE = {
  isFetching: true,
  judges: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case JUDGES_FETCH:
      return {
        ...state,
        isFetching: true
      };

    case JUDGES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        judges: action.judges
      };

    case JUDGES_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    default:
      return state;
  }
};
