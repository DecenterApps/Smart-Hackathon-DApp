import INCREMENT_COUNTER from './types';

const increment = () => (dispatch) => {
  dispatch({ type: INCREMENT_COUNTER });
};

module.exports = { increment };
