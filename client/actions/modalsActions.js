import { TOGGLE_MODAL } from './types';
import JuryModal from '../components/Modals/JuryModal';
import teamModal from '../components/Modals/TeamModal';
import sponsorModal from '../components/Modals/SponsorModal';

const toggleModal = (routePath, state) => (
  (dispatch) => {
    console.log('toggle modal');
    switch (routePath) {
      case '/admin/general':
        dispatch({ type: TOGGLE_MODAL, payload: { state, modalComponent: teamModal } });
        return true;
      case '/admin/teams':
        dispatch({ type: TOGGLE_MODAL, payload: { state, modalComponent: teamModal } });
        return true;
      case '/admin/sponsors':
        dispatch({ type: TOGGLE_MODAL, payload: { state, modalComponent: sponsorModal } });
        return true;
      case '/admin/judges':
        dispatch({ type: TOGGLE_MODAL, payload: { state, modalComponent: JuryModal } });
        return true;
      default:
        return false;
    }
  }
);

module.exports = { toggleModal };
