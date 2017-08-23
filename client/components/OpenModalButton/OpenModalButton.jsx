import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleModal } from '../../actions/modalsActions';

const OpenModalButton = ({ text, $toggleModal }) => (
  <button onClick={() => $toggleModal(location.hash, true)}>
    {text}
  </button>
);

OpenModalButton.propTypes = {
  $toggleModal: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default connect(null, { $toggleModal: toggleModal })(OpenModalButton);
