import React from 'react';
import PropTypes from 'prop-types';

require('./_index.scss');


const Header = ({ children }) => (
  <div className="header">
    <div className="title">
      <h1>StartIt Blockchain Hackathon</h1>
      <h2>Beograd 25/26/27 Avgust</h2>
    </div>
    <div className="other">
      {children}
    </div>
  </div>
);

Header.propTypes = {
  children: PropTypes.object
};
Header.defaultProps = {
  children: []
};

export default Header;
