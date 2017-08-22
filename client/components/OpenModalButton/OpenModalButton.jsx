import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleModal } from '../../actions/modalsActions';

const OpenModalButton = ({ text, $toggleModal, location }) => (
  <button onClick={() => $toggleModal(location.pathname, true)}>
    {text}
  </button>
);

OpenModalButton.propTypes = {
  $toggleModal: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired
};

const mapStateToProps = (state) => ({
  location: state.routing.locationBeforeTransitions
});

export default connect(mapStateToProps, { $toggleModal: toggleModal })(OpenModalButton);
