import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';
import { toggleModal } from '../../actions/modalsActions';

const ModalWrapper = ({ isOpen, $toggleModal, currentModal, location }) => (
  <Modal isOpen={isOpen} onRequestHide={$toggleModal}>
    <ModalHeader>
      <ModalClose onClick={() => $toggleModal(location.pathname, false)} />
      <ModalTitle>Modal title</ModalTitle>
    </ModalHeader>
    <ModalBody>
      { currentModal() }
      <p>Ab ea ipsam iure perferendis! Ad debitis dolore excepturi
        explicabo hic incidunt placeat quasi repellendus soluta,
        vero. Autem delectus est laborum minus modi molestias
        natus provident, quidem rerum sint, voluptas!</p>
    </ModalBody>
    <ModalFooter>
      <button className="btn btn-default" onClick={() => $toggleModal(location.pathname, false)}>
        Close
      </button>
      <button className="btn btn-primary">
        Save changes
      </button>
    </ModalFooter>
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
