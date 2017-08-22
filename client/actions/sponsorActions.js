import {
  SPONSORS_FETCH, SPONSORS_SUCCESS, SPONSORS_ERROR, ADD_SPONSOR, ADD_SPONSOR_SUCCESS,
  ADD_SPONSOR_ERROR
} from './types';
import { toggleModal } from './modalsActions';

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
  const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return pattern.test(str);
};

const sponsorsFormValidator = (values) => {
  const errors = {};

  if (!values.name) errors.name = 'Obavezno';
  if (!values.address) errors.address = 'Obavezno';
  if (!values.amount) errors.amount = 'Obavezno';
  if (!values.logoUrl) errors.logoUrl = 'Obavezno';
  if (!values.websiteUrl) errors.websiteUrl = 'Obavezno';

  errors.address = !web3.isAddress(values.address);
  errors.logoUrl = !isUriImage(values.logoUrl);
  errors.websiteUrl = !isURL(values.websiteUrl);
  errors.amount = isNaN(parseFloat(values.amount));

  return errors;
};

const submitAddSponsorsForm = (sponsor) => (dispatch, getState) => {
  dispatch({ type: ADD_SPONSOR });

  eth._contributeToPrizePool(
    sponsor.name,
    parseFloat(sponsor.amount),
    sponsor.websiteUrl,
    sponsor.logoUrl
  )
    .then((res) => {
      dispatch({ type: ADD_SPONSOR_SUCCESS, payload: { sponsor: res } });
      toggleModal(getState().routing.locationBeforeTransitions.pathname, false);
    })
    .catch((error) => {
      dispatch({ type: ADD_SPONSOR_ERROR, payload: { addSponsorError: error.message } });
    });
};

const fetchSponsors = () => (dispatch) => {
  dispatch({ type: SPONSORS_FETCH });
  eth.getSponsors()
    .then((res) => {
      console.log(res);
      dispatch({
        type: SPONSORS_SUCCESS,
        sponsors: res
      });
    })
    .catch((error) => {
      dispatch({
        type: SPONSORS_ERROR,
        error
      });
    });
};

module.exports = {
  fetchSponsors, sponsorsFormValidator, submitAddSponsorsForm
};
