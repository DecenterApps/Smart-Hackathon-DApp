import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, ModalBody } from 'react-modal-bootstrap';
import { toggleModal } from '../../actions/modalsActions';

const ModalWrapper = ({ isOpen, $toggleModal, currentModal, location }) => (
  <Modal isOpen={isOpen} onRequestHide={$toggleModal}>
    <div
      role="button"
      tabIndex="0"
      className="right-section"
      onClick={() => $toggleModal(location.pathname, false)}
    >
      HEADER
    </div>
    <ModalBody>
      { currentModal() }
    </ModalBody>
  </Modal>
);

ModalWrapper.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  $toggleModal: PropTypes.func.isRequired,
  currentModal: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired
};

const mapStateToProps = (state) => ({
  isOpen: state.modals.currentOpen,
  currentModal: state.modals.currentModal,
  location: state.routing.locationBeforeTransitions
});

export default connect(mapStateToProps, { $toggleModal: toggleModal })(ModalWrapper);
