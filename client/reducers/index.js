import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import userReducer from './userReducer';
import modalsReducer from './modalsReducer';
import teamsReducer from './teamsReducer';
import sponsorsReducer from './sponsorsReducer';
import judgesReducer from './judgesReducer';

export default combineReducers({
  routing: routerReducer,
  counter: counterReducer,
  user: userReducer,
  modals: modalsReducer,
  teams: teamsReducer,
  sponsors: sponsorsReducer,
  judges: judgesReducer,
});
