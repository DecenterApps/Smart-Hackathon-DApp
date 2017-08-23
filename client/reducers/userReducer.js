import { USER_CHECKING, USER_FOUND, PHASE_FETCH, PHASE_FETCH_SUCCESS, PHASE_FETCH_ERROR,
  CHANGE_PHASE, CHANGE_PHASE_SUCCESS, CHANGE_PHASE_ERROR } from '../actions/types';


const INITIAL_STATE = {
  isDetermined: false,
  type: 'other',
  phases: ['Registracija', 'Takmicenje', 'Glasanje', 'Kraj'],
  phase: 0,
  isFetching: false,
  phaseError: false,
  changingError: false,
  changingPhase: false,
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
        phaseError: 'Došlo je do greške'
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
        changingError: 'Došlo je do greške pri promeni perioda'
      };

    default:
      return state;
  }
};
