import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changePhase } from '../../../actions/userActions';
import CubeLoader from '../../Decorative/CubeLoader/CubeLoader';
import Payout from './Payout/Payout';

require('./adminOptions.scss');

const AdminOptions = ({
  $changePhase, changingPhase, changingError, phase, lastPhaseIndex
}) => (
  <div>
    {
      phase < lastPhaseIndex - 1 &&
      <div className="admin-change-phase">
        <span>Switch to the next period:</span>
        <button onClick={$changePhase} disabled={changingPhase}>
          {changingPhase && <CubeLoader />}
          {changingPhase ? 'Changing' : 'Go'}
        </button>

        {
          changingError && <div className="change-error">{changingError}</div>
        }

      </div>
    }
    {
      phase === lastPhaseIndex &&
      <div className="admin-change-phase">
        The last period is active. It can not be changed
      </div>
    }
    {
      phase === 3 && <Payout />
    }
  </div>
);

AdminOptions.propTypes = {
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

export default connect(mapStateToProps, { $changePhase: changePhase })(AdminOptions);
