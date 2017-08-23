import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changePhase } from '../../../actions/userActions';
import CubeLoader from '../../Decorative/CubeLoader/CubeLoader';

require('./adminChangePhase.scss');

const AdminChangePhase = ({
  $changePhase, changingPhase, changingError, phase, lastPhaseIndex
}) => (
  <div className="admin-change-phase">
    {
      phase < lastPhaseIndex &&
      <span>
        Promeni na sledeci period:
      </span>
    }

    {
      phase < lastPhaseIndex &&
      <button onClick={$changePhase} disabled={changingPhase}>
        {changingPhase && <CubeLoader />}
        {changingPhase ? 'Menja se' : 'Promeni'}
      </button>
    }

    {
      phase < lastPhaseIndex &&
      changingError && <div className="change-error">{changingError}</div>
    }

    { phase === lastPhaseIndex && <div>U toku je poslednji period koji ne može da se promeni</div>}
  </div>
);

AdminChangePhase.propTypes = {
  $changePhase: PropTypes.func.isRequired,
  changingPhase: PropTypes.bool.isRequired,
  changingError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  phase: PropTypes.number.isRequired,
  lastPhaseIndex: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
  changingPhase: state.user.changingPhase,
  changingError: state.user.changingError,
  phase: state.user.phase,
  lastPhaseIndex: state.user.phases.length - 1
});

export default connect(mapStateToProps, { $changePhase: changePhase })(AdminChangePhase);
