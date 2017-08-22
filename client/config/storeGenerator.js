import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import reducers from '../reducers/index';

const store = createStore(reducers, applyMiddleware(thunk));
const history = syncHistoryWithStore(hashHistory, store);

module.exports = { history, store };
