import {
  NEW_SPONSOR, SPONSORS_FETCH, SPONSORS_SUCCESS, SPONSORS_ERROR, ADD_SPONSOR, ADD_SPONSOR_SUCCESS,
  ADD_SPONSOR_ERROR, SPONSORS_PRIZE_ETH, SPONSORS_PRIZE_EUR
} from './types';
import toggleModal from './modalsActions';

import * as eth from '../modules/ethereumService';

const isUriImage = (uri) => {
  if (!uri) return false;
  const uriNoParam = uri.split('?')[0];
  const parts = uriNoParam.split('.');
  const extension = parts[parts.length - 1];
  const imageTypes = ['jpg', 'jpeg', 'tiff', 'png', 'gif', 'bmp'];
  return imageTypes.indexOf(extension) !== -1;
};

const isURL = (str) => {
  const regexp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm; // eslint-disable-line
  return regexp.test(str);
};

const sponsorsFormValidator = (values) => {
  const errors = {};

  if (!values.name) errors.name = 'Required';
  if (!values.amount) errors.amount = 'Required';
  if (!values.logoUrl) errors.logoUrl = 'Required';
  if (!values.websiteUrl) errors.websiteUrl = 'Required';

  if (values.logoUrl && !isUriImage(values.logoUrl)) errors.logoUrl = 'Url does not contain valid image extension';
  if (values.websiteUrl && !isURL(values.websiteUrl)) errors.websiteUrl = 'Url is not valid';

  if (values.amount) {
    const commaError = values.amount && values.amount.indexOf(',') > 0;
    const nanError = isNaN(parseFloat(values.amount));
    const amountError = parseFloat(values.amount) < 0.1;

    if (commaError) errors.amount = 'Use a full stop as a delimiter instead of a comma';
    if (nanError) errors.amount = 'The provided input is not a number';
    if (amountError) errors.amount = 'The donation can\'t be lower than 0.1 ETH';
  }

  return errors;
};

const submitAddSponsorsForm = (sponsor) => (dispatch) => {
  dispatch({ type: ADD_SPONSOR });

  eth._contributeToPrizePool(
    sponsor.name,
    parseFloat(sponsor.amount),
    sponsor.websiteUrl,
    sponsor.logoUrl
  )
    .then((res) => {
      dispatch({ type: ADD_SPONSOR_SUCCESS, payload: { sponsor: res } });
      dispatch(toggleModal(location.hash, false));
    })
    .catch((error) => {
      dispatch({ type: ADD_SPONSOR_ERROR, payload: { addSponsorError: error.message.toString() } });
    });
};

const fetchSponsors = () => (dispatch) => {
  dispatch({ type: SPONSORS_FETCH });
  eth.getSponsors()
    .then((res) => {
      dispatch({
        type: SPONSORS_SUCCESS,
        sponsors: res
      });
    })
    .catch((error) => {
      console.log(error);
      const errorMessage = error.message ? error.message.toString() : error;
      dispatch({
        type: SPONSORS_ERROR,
        error: errorMessage
      });
    });
};

const fetchPrizePoolSize = () => (dispatch) => {
  eth.getPrizePoolSize()
    .then((res) => {
      const prize = web3.fromWei(res).toString();
      console.log(prize);
      dispatch({
        type: SPONSORS_PRIZE_ETH,
        prize
      });
      fetch('https://www.bitstamp.net/api/v2/ticker/etheur/', {
        method: 'get'
      })
        .then(response => response.json())
        .then((data) => {
          console.log(data.last);
          console.log(data.last * prize);
          let eurPrize = data.last * prize;
          eurPrize = eurPrize.toFixed(2);
          dispatch({
            type: SPONSORS_PRIZE_EUR,
            prize: eurPrize.toString(),
          });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

const sponsorEventListener = () => (dispatch) => {
  eth.SponsorshipReceivedEvent((error, data) => {
    if (!error) {
      dispatch({
        type: NEW_SPONSOR,
        event: data,
      });
    }
  });
};

module.exports = {
  fetchSponsors,
  sponsorsFormValidator,
  submitAddSponsorsForm,
  sponsorEventListener,
  fetchPrizePoolSize,
};
