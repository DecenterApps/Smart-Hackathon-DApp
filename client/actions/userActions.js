import {
  PHASE_FETCH, PHASE_FETCH_SUCCESS, PHASE_FETCH_ERROR, CHANGE_PHASE,
  CHANGE_PHASE_SUCCESS, CHANGE_PHASE_ERROR, USER_CHECKING, USER_FOUND,
  SUBMIT_PAYOUT, SUBMIT_PAYOUT_ERROR, SUBMIT_PAYOUT_SUCCESS
} from './types';

import * as eth from '../modules/ethereumService';

const payoutTeams = (sortedTeams) => (dispatch) => {
  dispatch({ type: SUBMIT_PAYOUT });

  let sorted = true;

  for (let i = 0; i < sortedTeams.length - 1; i += 1) {
    if (sortedTeams[i].points > sortedTeams[i + 1].points) {
      sorted = false;
      break;
    }
  }

  if (!sorted) {
    dispatch({ type: SUBMIT_PAYOUT_ERROR });
  }

  const teamAddresses = sortedTeams.map((elem) => (elem.address));

  eth._payoutPrizes(teamAddresses)
    .then(() => {
      dispatch({ type: SUBMIT_PAYOUT_SUCCESS });
    })
    .catch(() => {
      dispatch({ type: SUBMIT_PAYOUT_ERROR });
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
      const phase = parseFloat(res[res.length - 1].args.newPeriod.toString());
      dispatch({ type: CHANGE_PHASE_SUCCESS, payload: { phase } });
    })
    .catch((error) => {
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

module.exports = { checkUser, fetchPhase, changePhase, payoutTeams };
