import {
  PHASE_FETCH, PHASE_FETCH_SUCCESS, PHASE_FETCH_ERROR, CHANGE_PHASE,
  CHANGE_PHASE_SUCCESS, CHANGE_PHASE_ERROR, USER_CHECKING, USER_FOUND,
  SUBMIT_PAYOUT, SUBMIT_PAYOUT_ERROR, SUBMIT_PAYOUT_SUCCESS, UPDATE_PHASE,
  ALREADY_VOTED
} from './types';

import * as eth from '../modules/ethereumService';

const payoutTeams = (sortedTeams) => (dispatch) => {
  dispatch({ type: SUBMIT_PAYOUT });

  for (let i = 0; i < sortedTeams.length - 1; i += 1) {
    if (sortedTeams[i].points < sortedTeams[i + 1].points) {
      return dispatch({
        type: SUBMIT_PAYOUT_ERROR,
        message: 'Teams are not sorted'
      });
    }
  }

  const teamAddresses = sortedTeams.map((elem) => (elem.address));

  return eth._payoutPrizes(teamAddresses)
    .then(() => {
      dispatch({ type: SUBMIT_PAYOUT_SUCCESS });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: SUBMIT_PAYOUT_ERROR,
        message: 'Payout prizes contract error.'
      });
    });
};

const fetchPhase = () => (dispatch) => {
  dispatch({ type: PHASE_FETCH });

  eth.getPhase()
    .then((res) => {
      const phase = parseFloat(res);
      dispatch({ type: PHASE_FETCH_SUCCESS, payload: { phase } });
    })
    .catch((error) => {
      dispatch({ type: PHASE_FETCH_ERROR, payload: { error } });
    });
};

const changePhase = () => (dispatch) => {
  dispatch({ type: CHANGE_PHASE });

  eth._switchToNextPeriod()
    .then((res) => {
      dispatch({ type: CHANGE_PHASE_SUCCESS, });
    })
    .catch((error) => {
      console.error(error);
      dispatch({ type: CHANGE_PHASE_ERROR, payload: { error: error.message.toString() } });
    });
};

const checkUser = () => (dispatch) => {
  dispatch({ type: USER_CHECKING });
  eth.getUserTypeWithTimeout()
    .then((res) => {
      console.log(res);
      dispatch({
        type: USER_FOUND,
        userType: res
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const periodChangedListener = () => (dispatch) => {
  eth.PeriodChangedEvent((error, event) => {
    if (!error) {
      console.log(event);
      const phase = parseFloat(event.args.newPeriod.toString());
      console.log(phase);
      dispatch({
        type: UPDATE_PHASE,
        payload: {
          phase,
        }
      });
    }
  });
};

const checkIfJuryVoted = () => (dispatch) => {
  eth.checkJuryVoted((error) => {
    if (!error) {
      dispatch({ type: ALREADY_VOTED });
    }
  });
};

module.exports = {
  periodChangedListener,
  checkUser,
  fetchPhase,
  changePhase,
  payoutTeams,
  checkIfJuryVoted
};
