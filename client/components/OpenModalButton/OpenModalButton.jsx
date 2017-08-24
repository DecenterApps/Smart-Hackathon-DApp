import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toggleModal from '../../actions/modalsActions';
import AddCircleIcon from '../Decorative/AddCircleIcon/AddCircleIcon';

const OpenModalButton = ({ text, $toggleModal, showIcon, phase }) => (
  <span>
    {
      (phase === 0) &&
      <button onClick={() => $toggleModal(location.hash, true)}>
        { showIcon && <AddCircleIcon /> }
        {text}
      </button>
    }
  </span>
);

OpenModalButton.defaultProps = {
  showIcon: false
};

OpenModalButton.propTypes = {
  $toggleModal: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  showIcon: PropTypes.bool,
  phase: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
  phase: state.user.phase
});

export default connect(mapStateToProps, { $toggleModal: toggleModal })(OpenModalButton);
