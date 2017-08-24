import {
  NEW_JUDGE,
  JUDGES_FETCH,
  JUDGES_SUCCESS,
  JUDGES_ERROR,
  ADD_JUDGE,
  ADD_JUDGE_SUCCESS,
  ADD_JUDGE_ERROR
} from './types';
import toggleModal from './modalsActions';

import * as eth from '../modules/ethereumService';

const judgesFormValidator = (values) => {
  const errors = {};

  if (!values.name) errors.name = 'Required';
  if (!values.address) errors.address = 'Required';

  if (values.address && !web3.isAddress(values.address)) errors.address = 'Ethereum address is not valid';

  return errors;
};

const submitAddJudgesForm = (judge) => (dispatch) => {
  dispatch({ type: ADD_JUDGE });

  eth._registerJuryMember(judge.name, judge.address)
    .then((res) => {
      dispatch({ type: ADD_JUDGE_SUCCESS, payload: { judge: res } });
      dispatch(toggleModal(location.hash, false));
    })
    .catch((error) => {
      dispatch({ type: ADD_JUDGE_ERROR, payload: { addJudgeError: error.message } });
    });
};

const fetchJudges = () => (dispatch) => {
  dispatch({ type: JUDGES_FETCH });
  eth.getJuries()
    .then((res) => {
      dispatch({
        type: JUDGES_SUCCESS,
        judges: res
      });
    })
    .catch((error) => {
      console.log(error);
      const errorMessage = error.message ? error.message : error;
      dispatch({
        type: JUDGES_ERROR,
        error: errorMessage
      });
    });
};

const judgeEventListener = () => (dispatch) => {
  eth.JuryMemberAddedEvent((error, data) => {
    if (!error) {
      console.log(data);
      dispatch({
        type: NEW_JUDGE,
        event: data,
      });
    }
  });
};

module.exports = {
  fetchJudges,
  judgesFormValidator,
  submitAddJudgesForm,
  judgeEventListener,
};
