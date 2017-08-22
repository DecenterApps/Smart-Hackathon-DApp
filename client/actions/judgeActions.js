import { JUDGES_FETCH, JUDGES_SUCCESS, JUDGES_ERROR } from './types';

import * as eth from '../modules/ethereumService';

const fetchJudges = () => (dispatch) => {
  dispatch({ type: JUDGES_FETCH });
  eth.getJuries()
    .then((res) => {
      console.log(res);
      dispatch({
        type: JUDGES_SUCCESS,
        judges: res
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: JUDGES_ERROR,
        error
      });
    });
};

export default {
  fetchJudges
};
