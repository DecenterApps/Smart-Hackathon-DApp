import React from 'react';
import PropTypes from 'prop-types';

const DollarIcon = ({ color, size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="115 1329 20 20" style={{ height: size }}>
    <path
      d={'M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm1.41,16.09V20H10.74V18.07a3.721,3.721,0,0,1-3' +
      '.27-3.4H9.43c.1,1.05.82,1.87,2.65,1.87,1.96,0,2.4-.98,2.4-1.59,0-.83-.44-1.61-2.67-2.14-2.48' +
      '-.6-4.18-1.62-4.18-3.67,0-1.72,1.39-2.84,3.11-3.21V4h2.67V5.95a3.535,3.535,0,0,1,2.85,3.39H1' +
      '4.3c-.05-1.11-.64-1.87-2.22-1.87-1.5,0-2.4.68-2.4,1.64,0,.84.65,1.39,2.67,1.91s4.18,1.39,4.1' +
      '8,3.91c-.01,1.83-1.38,2.83-3.12,3.16Z'}
      transform="translate(113 1327)"
      style={{ fill: color }}
    />
  </svg>

);

DollarIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string
};
DollarIcon.defaultProps = {
  color: '#FFC107',
  size: '20px'
};

export default DollarIcon;
