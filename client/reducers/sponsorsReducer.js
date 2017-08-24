import {
  SPONSORS_FETCH, SPONSORS_SUCCESS, SPONSORS_ERROR, ADD_SPONSOR, ADD_SPONSOR_SUCCESS,
  ADD_SPONSOR_ERROR, NEW_SPONSOR, SPONSORS_PRIZE_ETH, SPONSORS_PRIZE_EUR
} from '../actions/types';


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

    case NEW_SPONSOR:
      return {
        ...state,
        sponsors: [
          ...state.sponsors,
          action.event,
        ]
      };

    case ADD_SPONSOR:
      return {
        ...state,
        submitting: true
      };

    case ADD_SPONSOR_SUCCESS:
      return {
        ...state,
        submitting: false,
        addSponsorError: false,
      };

    case ADD_SPONSOR_ERROR:
      return {
        ...state,
        submitting: false,
        addSponsorError: action.payload.addSponsorError
      };

    case SPONSORS_PRIZE_ETH:
      return {
        ...state,
        ethPrize: action.prize,
      };

    case SPONSORS_PRIZE_EUR:
      return {
        ...state,
        eurPrize: action.prize,
      };

    default:
      return state;
  }
};
