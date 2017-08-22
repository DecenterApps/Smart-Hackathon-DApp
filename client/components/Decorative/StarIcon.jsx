import React from 'react';
import PropTypes from 'prop-types';

const StarIcon = ({ color, size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="3038 1240 24 24" style={{ height: size }}>
    <g id="ic_stars_black_24px" transform="translate(3038 1240)">
      <path style={{ fill: 'none' }} d="M0,0H24V24H0Z" />
      <path
        style={{ fill: color }}
        d={'M11.99,2A10,10,0,1,0,22,12,10,10,0,0,0,11.99,2Zm4.24,16L12,15.45,7.77,18l1.12-4.81L5.16,' +
        '9.96l4.92-.42L12,5l1.92,4.53,4.92.42-3.73,3.23Z'}
      />
    </g>
  </svg>
);


StarIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string
};
StarIcon.defaultProps = {
  color: '#FFC107',
  size: '20px'
};

export default StarIcon;
