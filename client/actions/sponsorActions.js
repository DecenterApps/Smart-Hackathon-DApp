import {
  NEW_SPONSOR, SPONSORS_FETCH, SPONSORS_SUCCESS, SPONSORS_ERROR, ADD_SPONSOR, ADD_SPONSOR_SUCCESS,
  ADD_SPONSOR_ERROR, NEW_JUDGE
} from './types';
import toggleModal from './modalsActions';

import * as eth from '../modules/ethereumService';

const sponsorsFormValidator = (values) => {
  const errors = {};

  if (!values.name) errors.name = 'Required';
  if (!values.amount) errors.amount = 'Required';
  if (!values.logoUrl) errors.logoUrl = 'Required';
  if (!values.websiteUrl) errors.websiteUrl = 'Required';

  if (values.amount) {
    const commaError = values.amount && values.amount.indexOf(',') > 0;
    const nanError = isNaN(parseFloat(values.amount));

    if (commaError) errors.amount = 'Use a full stop as a delimiter instead of a comma';
    if (nanError) errors.amount = 'The provided input is not a number';
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
      dispatch({ type: ADD_SPONSOR_ERROR, payload: { addSponsorError: error.message } });
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
      const errorMessage = error.message ? error.message : error;
      dispatch({
        type: SPONSORS_ERROR,
        error: errorMessage
      });
    });
};

const sponsorEventListener = () => (dispatch) => {
  eth.SponsorshipReceivedEvent()
    .then(data => {
      dispatch({
        type: NEW_JUDGE,
        event: data,
      });
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = {
  fetchSponsors,
  sponsorsFormValidator,
  submitAddSponsorsForm,
  sponsorEventListener,
};
