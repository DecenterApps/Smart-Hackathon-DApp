import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal } from 'react-modal-bootstrap';
import { toggleModal } from '../../../actions/modalsActions';
import CloseIcon from '../../Decorative/CloseIcon/CloseIcon';

require('./modalWrapper.scss');

const ModalWrapper = ({ isOpen, $toggleModal, currentModal, location, $style }) => (
  <Modal isOpen={isOpen} onRequestHide={$toggleModal} dialogStyles={$style}>
    <div className="modal-header">
      <span
        role="button"
        tabIndex={0}
        onClick={() => $toggleModal(location.pathname, false)}
      >
        <CloseIcon />
      </span>
    </div>
    <div className="modal-wrapper-body">
      { currentModal() }
    </div>
  </Modal>
);

ModalWrapper.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  $toggleModal: PropTypes.func.isRequired,
  currentModal: PropTypes.func.isRequired,
  $style: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired
};

const mapStateToProps = (state) => ({
  isOpen: state.modals.currentOpen,
  currentModal: state.modals.currentModal,
  location: state.routing.locationBeforeTransitions,
  $style: { open: { top: 95 } }
});

export default connect(mapStateToProps, { $toggleModal: toggleModal })(ModalWrapper);
