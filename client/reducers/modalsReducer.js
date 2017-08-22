import actions from '../actions/modalActions';

const INITIAL_STATE = {
  judgesOpen: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.CLOSE_MODAL:
      return { ...state, [action.payload.type]: actions.type.state };

    default:
      return state;
  }
};
