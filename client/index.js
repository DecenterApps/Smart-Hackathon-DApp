import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './config/Routes.jsx';
import initWeb3 from './config/initWeb3';
import { history, store } from './config/storeGenerator';

const startApp = () => {
  initWeb3();

  ReactDOM.render(
    <div>
      <Routes history={history} store={store} />
    </div>, document.getElementById('root'));
};

window.addEventListener('load', startApp);
