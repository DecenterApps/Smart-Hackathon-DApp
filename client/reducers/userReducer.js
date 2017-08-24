import {
  USER_CHECKING, USER_FOUND, PHASE_FETCH, PHASE_FETCH_SUCCESS, PHASE_FETCH_ERROR,
  CHANGE_PHASE, CHANGE_PHASE_SUCCESS, CHANGE_PHASE_ERROR,
  SUBMIT_PAYOUT, SUBMIT_PAYOUT_SUCCESS, SUBMIT_PAYOUT_ERROR
} from '../actions/types';


const INITIAL_STATE = {
  isDetermined: false,
  type: 'other',
  phases: ['Registration', 'Competition', 'Voting', 'Verification', 'End'],
  phase: 0,
  isFetching: false,
  phaseError: false,
  changingError: false,
  changingPhase: false,
  submittingPayout: false,
  submittingPayoutError: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_CHECKING:
      return state;
    case USER_FOUND:
      return {
        ...state,
        isDetermined: true,
        type: action.userType,
      };
    case PHASE_FETCH:
      return {
        ...state,
        isFetching: true
      };

    case PHASE_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        phase: action.payload.phase,
        phaseError: false
      };

    case PHASE_FETCH_ERROR:
      return {
        ...state,
        isFetching: false,
        phaseError: 'Error occurred'
      };

    case CHANGE_PHASE:
      return {
        ...state,
        changingPhase: true
      };

    case CHANGE_PHASE_SUCCESS:
      return {
        ...state,
        changingPhase: false,
        phase: action.payload.phase,
        changingError: false
      };

    case CHANGE_PHASE_ERROR:
      return {
        ...state,
        changingPhase: false,
        changingError: 'Error occurred while changing period'
      };

    case SUBMIT_PAYOUT:
      return {
        ...state,
        submittingPayout: true
      };

    case SUBMIT_PAYOUT_SUCCESS:
      return {
        ...state,
        submittingPayout: false,
        submittingPayoutError: false
      };

    case SUBMIT_PAYOUT_ERROR:
      return {
        ...state,
        submittingPayout: false,
        submittingPayoutError: 'Error occurred while submitting payout'
      };

    default:
      return state;
  }
};
