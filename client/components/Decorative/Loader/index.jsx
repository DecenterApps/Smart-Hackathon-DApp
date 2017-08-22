import React from 'react';
import PropTypes from 'prop-types';

require('./_index.scss');

const Loader = ({ color, size }) => (
  <span className="loader" style={{ 'background-color': color, height: size, width: size }} />
);

Loader.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string
};
Loader.defaultProps = {
  color: 'black',
  size: '30px'
};

export default Loader;
