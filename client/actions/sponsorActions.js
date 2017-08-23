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
  const regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/; // eslint-disable-line
  return regexp.test(str);
};

const sponsorsFormValidator = (values) => {
  const errors = {};

  if (Object.keys(values).length === 0) return {};
  if (!values.name) errors.name = 'Obavezno';
  if (!values.amount) errors.amount = 'Obavezno';
  if (!values.logoUrl) errors.logoUrl = 'Obavezno';
  if (!values.websiteUrl) errors.websiteUrl = 'Obavezno';

  errors.logoUrl = !isUriImage(values.logoUrl);
  errors.websiteUrl = !isURL(values.websiteUrl);
  const commaError = values.amount && values.amount.indexOf(',') > 0;
  const nanError = isNaN(parseFloat(values.amount));
  errors.amount = commaError || nanError;

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
      toggleModal(location.hash, false);
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
