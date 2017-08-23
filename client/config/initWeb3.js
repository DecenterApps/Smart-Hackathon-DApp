/* eslint-disable */
export default () => {
  if (typeof web3 !== 'undefined') {
    return window.web3 = new Web3(web3.currentProvider);
  }

  /*const web3 = require('web3');

  if (!new Web3.providers.HttpProvider('http://localhost:8545')) {
    alert('Unable to connect to Web3 provider'); // make a page that says that it can't be used
  }

  window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));*/
};
