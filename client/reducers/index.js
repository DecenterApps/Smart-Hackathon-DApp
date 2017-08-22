import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import userReducer from './userReducer';
import modalsReducer from './modalsReducer';

export default combineReducers({
  routing: routerReducer,
  counter: counterReducer,
  user: userReducer,
  modals: modalsReducer
});
