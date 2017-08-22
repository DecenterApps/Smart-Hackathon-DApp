import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import userReducer from './userReducer';
import modalsReducer from './modalsReducer';


export default combineReducers({
  form: formReducer,
  routing: routerReducer,
  counter: counterReducer,
  user: userReducer,
  modals: modalsReducer
});
