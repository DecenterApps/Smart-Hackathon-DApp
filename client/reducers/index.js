import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import modalsReducer from './modalsReducer';
import teamsReducer from './teamsReducer';
import sponsorsReducer from './sponsorsReducer';
import judgesReducer from './judgesReducer';


export default combineReducers({
  form: formReducer,
  routing: routerReducer,
  user: userReducer,
  modals: modalsReducer,
  teams: teamsReducer,
  sponsors: sponsorsReducer,
  judges: judgesReducer,
});
