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
        Go to next period:
      </span>
    }

    {
      phase < lastPhaseIndex &&
      <button onClick={$changePhase} disabled={changingPhase}>
        {changingPhase && <CubeLoader />}
        {changingPhase ? 'Changing' : 'Change'}
      </button>
    }

    {
      phase < lastPhaseIndex &&
      changingError && <div className="change-error">{changingError}</div>
    }

    { phase === lastPhaseIndex && <div>The last period is active. It can not be changed</div>}
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
