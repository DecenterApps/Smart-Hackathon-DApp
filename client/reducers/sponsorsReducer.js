import { SPONSORS_FETCH, SPONSORS_SUCCESS, SPONSORS_ERROR, ADD_SPONSOR, ADD_SPONSOR_SUCCESS, ADD_SPONSOR_ERROR } from '../actions/types';


const INITIAL_STATE = {
  isFetching: true,
  sponsors: [],
  submitting: false,
  addSponsorError: false
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

    case ADD_SPONSOR:
      return {
        ...state,
        submitting: true
      };

    case ADD_SPONSOR_SUCCESS:
      return {
        submitting: false,
        addSponsorError: false,
        sponsors: [...state.sponsors, action.payload.sponsor]
      };

    case ADD_SPONSOR_ERROR:
      return {
        ...state,
        submitting: false,
        addSponsorError: action.payload.addSponsorError
      };

    default:
      return state;
  }
};
