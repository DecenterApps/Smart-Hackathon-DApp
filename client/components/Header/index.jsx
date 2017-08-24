import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

require('./_index.scss');

const Header = ({ children }) => (
  <div className="header">
    <div className="title">
      <h1><Link to="/">Startit Blockchain Hackathon</Link></h1>
      <h2>Belgrade 25/26/27 August 2017</h2>
    </div>
    <div className="other">
      {children}
    </div>
  </div>
);

Header.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
};

Header.defaultProps = {
  children: []
};

export default Header;
