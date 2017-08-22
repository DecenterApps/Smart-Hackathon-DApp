import { TOGGLE_MODAL } from './types';
import JudgeModal from '../components/Modals/JudgeModal';
import teamModal from '../components/Modals/TeamModal';
import sponsorModal from '../components/Modals/SponsorModal';

const toggleModal = (routePath, state) => (
  (dispatch) => {
    switch (routePath) {
      case '/admin/teams':
        dispatch({ type: TOGGLE_MODAL, payload: { state, modalComponent: teamModal } });
        return true;
      case '/admin/sponsors':
        dispatch({ type: TOGGLE_MODAL, payload: { state, modalComponent: sponsorModal } });
        return true;
      case '/admin/judges':
        dispatch({ type: TOGGLE_MODAL, payload: { state, modalComponent: JudgeModal } });
        return true;
      default:
        return false;
    }
  }
);

module.exports = { toggleModal };
