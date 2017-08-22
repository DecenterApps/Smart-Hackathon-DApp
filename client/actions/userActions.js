import { PHASE_FETCH, PHASE_FETCH_SUCCESS, PHASE_FETCH_ERROR } from './types';

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

module.exports = { fetchPhase };
