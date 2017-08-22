/* eslint-disable */
import { saveWeb3 } from '../config/saveWeb3';

export default () => {
  if (typeof web3 !== 'undefined') {
    return window.web3 = new Web3(web3.currentProvider);
    // return saveWeb3(new Web3(web3.currentProvider)); // using metaMask
  }

  const web3 = require('web3');

  if (!new Web3.providers.HttpProvider('http://localhost:8545')) {
    alert('Unable to connect to Web3 provider'); // make a page that says that it can't be used
  }

  // saveWeb3(new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))); // using local node
  window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
};
