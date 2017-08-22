/* eslint-disable */
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

export const SponsorshipReceivedEvent = () =>
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

export const TeamRegisteredEvent = () =>
  new Promise((resolve, reject) => {
    hackathonContract.TeamRegistered({}, { fromBlock: 0, toBlock: 'latest' })
      .watch((error, event) => {
        if (error) {
          return reject(error);
        }

        return resolve(event);
      });
  });

export const VoteReceivedEvent = () =>
  new Promise((resolve, reject) => {
    hackathonContract.VoteReceived({}, { fromBlock: 0, toBlock: 'latest' })
      .watch((error, event) => {
        if (error) {
          return reject(error);
        }

        return resolve(event);
      });
  });

/* Contract functions (prefixed by "_") */

export const _goToNextPeriod = () =>
  new Promise((resolve, reject) => {
    hackathonContract.goToNextPeriod((error, result) => {
      if (error) {
        return reject({
          message: error,
        });
      }

      return resolve(result);
    });
  });

export const _registerTeam = (name, teamAddress, rewardEligible) =>
  new Promise((resolve, reject) => {
    if (!web3.isAddress(teamAddress)) {
      return reject({
        message: 'Invalid team address.',
      });
    }

    return hackathonContract.registerTeam(name.toString(), teamAddress, !!rewardEligible,
      (error, result) => {
        if (error) {
          return reject({
            message: error,
          });
        }

        return resolve(result);
      });
  });

export const _registerJuryMember = (juryMemberAddress) =>
  new Promise((resolve, reject) => {
    if (!web3.isAddress(juryMemberAddress)) {
      return reject({
        message: 'Invalid jury member address.',
      });
    }

    return hackathonContract.registerJuryMember(juryMemberAddress, (error, result) => {
      if (error) {
        return reject({
          message: error,
        });
      }

      return resolve(result);
    });
  });

export const _contributeToPrizePool = (name, amount, siteUrl, logoUrl) =>
  new Promise((resolve, reject) => {
    hackathonContract.contributeToPrizePool(
      siteUrl.toString(),
      logoUrl.toString(),
      name.toString(),
      { value: web3.toWei(amount, 'ether') },
      (error, result) => {
        if (error) {
          return reject({
            message: error,
          });
        }

        return resolve(result);
      });
  });

export const _vote = (votes) =>
  new Promise((resolve, reject) => {
    for (let i = 0; i < votes.length; i += 1) {
      if (!web3.isAddress(votes[i])) {
        return reject({
          message: `Team at index ${i} has an invalid address.`,
        });
      }
    }

    return hackathonContract.vote(votes, (error, result) => {
      if (error) {
        return reject({
          message: error,
        });
      }

      return resolve(result);
    });
  });

/* Getters for contract state */

export const getTeams = () =>
  new Promise((resolve, reject) => {
    hackathonContract.TeamRegistered({}, {
      fromBlock: contract.startingBlock, toBlock: 'latest'
    })
      .get((error, events) => {
        if (error) {
          return reject({
            message: error,
          });
        }

        return resolve(events);
      });
  });

export const getJuries = () =>
  new Promise((resolve, reject) => {
    hackathonContract.JuryMemberAdded({}, {
      fromBlock: contract.startingBlock, toBlock: 'latest'
    })
      .get((error, events) => {
        if (error) {
          return reject({
            message: error,
          });
        }

        return resolve(events);
      });
  });

export const getSponsors = () =>
  new Promise((resolve, reject) => {
    hackathonContract.SponsorshipReceived({}, {
      fromBlock: contract.startingBlock, toBlock: 'latest',
    })
      .get((error, events) => {
        if (error) {
          return reject({
            message: error,
          });
        }

        return resolve(events);
      });
  });

export const getUserType = () =>
  new Promise((resolve, reject) => {
    hackathonContract.getUserType(getAccount(), (error, result) => {
      if (error) {
        return reject({
          message: error,
        });
      }

      return resolve(result);
    });
  });

setTimeout(() => {
  // getUserType()
  //   .then(data => console.log(data))
  //   .catch(error => console.error(error));
}, 1000);

