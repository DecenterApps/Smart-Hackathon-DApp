import React from 'react';
import PropTypes from 'prop-types';

const EthereumIcon = ({ size }) => (
  <svg
    enableBackground="new 0 0 226.777 226.777"
    height={size}
    id="Layer_1"
    version="1.1"
    viewBox="0 0 226.777 226.777"
    width={size}
    xmlSpace="preserve"
  >
    <g>
      <polygon fill="#231F20" points="112.553,157 112.553,86.977 44.158,116.937  " />
      <polygon fill="#231F20" points="112.553,82.163 112.553,-0.056 46.362,111.156  " />
      <polygon fill="#231F20" points="116.962,-0.09 116.962,82.163 184.083,111.566  " />
      <polygon fill="#231F20" points="116.962,86.977 116.962,157.002 185.405,116.957  " />
      <polygon fill="#231F20" points="112.553,227.406 112.553,171.085 44.618,131.31  " />
      <polygon fill="#231F20" points="116.962,227.406 184.897,131.31 116.962,171.085  " />
    </g>
  </svg>
);

EthereumIcon.propTypes = {
  size: PropTypes.string
};
EthereumIcon.defaultProps = {
  size: '20px'
};

export default EthereumIcon;
