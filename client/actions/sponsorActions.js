import { SPONSORS_FETCH, SPONSORS_SUCCESS, SPONSORS_ERROR } from './types';

import * as eth from '../modules/ethereumService';

const fetchSponsors = () => (dispatch) => {
  dispatch({ type: SPONSORS_FETCH });
  eth.getSponsors()
    .then((res) => {
      console.log(res);
      dispatch({
        type: SPONSORS_SUCCESS,
        sponsors: res
      });
    })
    .catch((error) => {
      dispatch({
        type: SPONSORS_ERROR,
        error
      });
    });
};

export default {
  fetchSponsors
};
