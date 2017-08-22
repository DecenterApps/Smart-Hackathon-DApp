import { SPONSORS_FETCH, SPONSORS_SUCCESS, SPONSORS_ERROR } from '../actions/types';


const INITIAL_STATE = {
  isFetching: true,
  sponsors: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SPONSORS_FETCH:
      return {
        ...state,
        isFetching: true
      };

    case SPONSORS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        sponsors: action.sponsors
      };

    case SPONSORS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    default:
      return state;
  }
};
