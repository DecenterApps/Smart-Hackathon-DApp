import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './config/Routes.jsx';
import NoMetamask from './components/NoMetamask/NoMetamask';
import initWeb3 from './config/initWeb3';
import { history, store } from './config/storeGenerator';
import ParticlesJson from './external/particlesConfig.json';

particlesJS("particles-js", ParticlesJson); // eslint-disable-line

const startApp = () => {
  const hasMetamask = initWeb3();

  if (!hasMetamask) {
    let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

    ReactDOM.render(<NoMetamask isChrome={isChrome} />, document.getElementById('root'));
  } else {
    ReactDOM.render(
      <div>
        <Routes history={history} store={store} />
      </div>, document.getElementById('root'));
  }
};

window.addEventListener('load', startApp);
