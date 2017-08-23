import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import reducers from '../reducers/index';
import userActions from '../actions/userActions';


const reduxDevToolsEnchancer = window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__();
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers, reduxDevToolsEnchancer);

const history = syncHistoryWithStore(hashHistory, store);

store.dispatch(userActions.checkUser());

module.exports = { history, store };
