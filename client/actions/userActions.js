import { PHASE_FETCH, PHASE_FETCH_SUCCESS, PHASE_FETCH_ERROR, CHANGE_PHASE,
  CHANGE_PHASE_SUCCESS, CHANGE_PHASE_ERROR, USER_CHECKING, USER_FOUND } from './types';

import * as eth from '../modules/ethereumService';

const fetchPhase = () => (dispatch) => {
  dispatch({ type: PHASE_FETCH });

  eth.getPhase()
    .then((res) => {
      dispatch({ type: PHASE_FETCH_SUCCESS, payload: { phase: res.length } });
    })
    .catch((error) => {
      dispatch({ type: PHASE_FETCH_ERROR, payload: { error } });
    });
};

const changePhase = () => (dispatch) => {
  dispatch({ type: CHANGE_PHASE });

  eth._switchToNextPeriod()
    .then((res) => {
      dispatch({ type: CHANGE_PHASE_SUCCESS, payload: { phase: res } });
    })
    .catch((error) => {
      dispatch({ type: CHANGE_PHASE_ERROR, payload: { error: error.message } });
    });
};


const checkUser = () => (dispatch) => {
  dispatch({ type: USER_CHECKING });
  eth.getUserType()
    .then((res) => {
      dispatch({
        type: USER_FOUND,
        userType: res
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: USER_FOUND,
        userType: 'other'
      });
    });
};

module.exports = { checkUser, fetchPhase, changePhase };
