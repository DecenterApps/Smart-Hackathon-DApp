import React from 'react';
import { TOGGLE_MODAL } from '../actions/types';

const INITIAL_STATE = {
  currentOpen: false,
  currentModal: () => <div>error</div>
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        currentModal: action.payload.modalComponent,
        currentOpen: action.payload.state
      };

    default:
      return state;
  }
};
