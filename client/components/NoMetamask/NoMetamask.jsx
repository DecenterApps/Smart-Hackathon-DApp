import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/index';

const NoMetamask = ({ isChrome }) => (
  <div className="no-metamask-wrapper">
    <Header noLink />

    <div className="container white landing-wrapper chrome-metamask-wrapper">
      {
        isChrome &&
        <div className="browser-wrapper">
          <h2>
            In order to use this app you need to install the
            <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">Metamask</a>
            extension.
          </h2>
        </div>
      }
      {
        !isChrome &&
        <div className="browser-wrapper not-chrome">
          <h2>
            In order to use this app you must access it
            through the Chrome web browser
            <br />
            and install the
            <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">Metamask</a>
            extension.
          </h2>
        </div>
      }
    </div>
  </div>
);

NoMetamask.propTypes = {
  isChrome: PropTypes.bool.isRequired
};

export default NoMetamask;
