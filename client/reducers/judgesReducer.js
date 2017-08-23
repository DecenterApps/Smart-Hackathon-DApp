import {
  JUDGES_FETCH, JUDGES_SUCCESS, JUDGES_ERROR, ADD_JUDGE, ADD_JUDGE_SUCCESS,
  ADD_JUDGE_ERROR, NEW_JUDGE
} from '../actions/types';


const INITIAL_STATE = {
  isFetching: true,
  judges: [],
  submitting: false,
  addJudgeError: false
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

    case NEW_JUDGE:
      return {
        ...state,
        judges: [
          ...state.judges,
          action.event
        ]
      };

    case ADD_JUDGE:
      return {
        ...state,
        submitting: true
      };

    case ADD_JUDGE_SUCCESS:
      return {
        ...state,
        submitting: false,
        addJudgeError: false,
      };

    case ADD_JUDGE_ERROR:
      return {
        ...state,
        submitting: false,
        addJudgeError: action.payload.addSponsorError
      };

    default:
      return state;
  }
};
