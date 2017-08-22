import contract from './contract.json';

const networkIds = {
  mainnet: '1',
  morden: '2',
  ropsten: '3',
  kovan: '42',
};

let hackathonContract;

window.onload = () => {
  hackathonContract = web3.eth.contract(contract.abi).at(contract.contractAddress);
  console.log(hackathonContract);
  console.log('###########');
};

export const getWeb3Status = () =>
  new Promise((resolve, reject) => {
    if (!web3) {
      return reject({
        message: 'NOT_FOUND',
      });
    }

    return web3.version.getNetwork((err, netId) => {
      if (netId.toString() !== networkIds.kovan) {
        return reject({
          message: 'WRONG_NETWORK',
        });
      }

      return resolve();
    });
  });

export const getAccount = () => {
  if (!web3.eth.accounts || !web3.eth.accounts.length) { return false; }

  return web3.eth.accounts[0];
};

export const getBlockNumber = () =>
  new Promise((resolve, reject) => {
    web3.eth.getBlockNumber((error, latestBlock) => {
      if (error) {
        return reject(error);
      }

      return resolve(latestBlock);
    });
  });

/* Events */

export const PeriodChangedEvent = () =>
  new Promise((resolve, reject) => {
    hackathonContract.PeriodChanged({}, { fromBlock: 0, toBlock: 'latest' })
      .watch((error, event) => {
        if (error) {
          return reject(error);
        }

        console.log(`Period changed event: ${event}`);
        return resolve(event);
      });
  });

export const PrizePaidEvent = () =>
  new Promise((resolve, reject) => {
    hackathonContract.PrizePaid({}, { fromBlock: 0, toBlock: 'latest' })
      .watch((error, event) => {
        if (error) {
          return reject(error);
        }

        console.log(`Prize paid event: ${event}`);
        return resolve(event);
      });
  });

export const SponsorshipReceivedEvent = () => {
  new Promise((resolve, reject) => {
    hackathonContract.SponsorshipReceived({}, { fromBlock: 0, toBlock: 'latest' })
      .watch((error, event) => {
        if (error) {
          return reject(error);
        }

        console.log(`Sponsorship received event: ${event}`);
        return resolve(event);
      });
  });
};

export const TeamRegisteredEvent = () => {
  new Promise((resolve, reject) => {
    hackathonContract.TeamRegistered({}, { fromBlock: 0, toBlock: 'latest' })
      .watch((error, event) => {
        if (error) {
          return reject(error);
        }

        return resolve(event);
      });
  });
};

export const VoteReceivedEvent = () => {
  new Promise((resolve, reject) => {
    hackathonContract.VoteReceived({}, { fromBlock: 0, toBlock: 'latest' })
      .watch((error, event) => {
        if (error) {
          return reject(error);
        }

        return resolve(event);
      });
  });
};
