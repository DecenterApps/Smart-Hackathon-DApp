import { TEAMS_FETCH, TEAMS_SUCCESS, TEAMS_ERROR } from './types';

import * as eth from '../modules/ethereumService';

const fetchTeams = () => (dispatch) => {
  dispatch({ type: TEAMS_FETCH });
  eth.getTeams()
    .then((res) => {
      console.log(res);
      dispatch({
        type: TEAMS_SUCCESS,
        teams: res
      });
    })
    .catch((error) => {
      dispatch({
        type: TEAMS_ERROR,
        error
      });
    });
};

export default {
  fetchTeams
};
