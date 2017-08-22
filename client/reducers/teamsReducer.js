import { TEAMS_FETCH, TEAMS_SUCCESS, TEAMS_ERROR } from '../actions/types';


const INITIAL_STATE = {
  isFetching: true,
  teams: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TEAMS_FETCH:
      return {
        ...state,
        isFetching: true
      };

    case TEAMS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        teams: action.teams
      };

    case TEAMS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    default:
      return state;
  }
};
