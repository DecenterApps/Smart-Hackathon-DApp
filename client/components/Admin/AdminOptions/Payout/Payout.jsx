import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import * as teamActions from '../../../../actions/teamActions';
import userActions from '../../../../actions/userActions';

import CubeLoader from '../../../Decorative/CubeLoader/CubeLoader';
import Loader from '../../../Decorative/Loader/index';
import arrowup from '../../../Jury/assets/001-arrows.png';
import arrowdown from '../../../Jury/assets/002-arrows-1.png';

require('./payout.scss');

class Payout extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.payoutTeams = this.payoutTeams.bind(this);
  }

  componentDidMount() {
    this.props.fetchTeamScores();
  }

  payoutTeams() {
    // fix after points implementation
    const votes = this.props.teams.teams.map((elem, i) => ({
      address: elem.args.teamAddress,
      points: i + 1,
    }));

    this.props.payoutTeams(votes);
  }

  render() {
    return (
      <div className="payout-wrapper">
        {
          this.props.teams.isFetching &&
          <div className="empty-section">
            <h1><Loader color="#777" />Loading</h1>
          </div>
        }
        {
          !this.props.teams.isFetching &&
          this.props.teams.error &&
          <div className="empty-section">
            <h1>{this.props.teams.error.toString()}</h1>
          </div>
        }
        {
          !this.props.teams.isFetching &&
          !this.props.teams.error &&
          !this.props.teams.teams.length > 0 &&
          <div className="empty-section">
            <div className="">
              <h1>No teams</h1>
            </div>
          </div>
        }

        {
          !this.props.teams.isFetching &&
          !this.props.teams.error &&
          this.props.teams.teams.length > 0 &&
          <div className="pay-button-wrapper">
            Payout reward to teams:
            <button onClick={this.payoutTeams} disabled={this.props.user.submittingPayout}>
              {this.props.user.submittingPayout && <CubeLoader />}
              {this.props.user.submittingPayout ? 'Paying Out' : 'Payout'}
            </button>
          </div>
        }

        {
          this.props.teams &&
          this.props.user.submittingPayoutError &&
          !this.props.user.submittingPayout &&
          <div className="payout-error">{this.props.user.submittingPayoutError}</div>
        }

        {
          !this.props.teams.isFetching &&
          !this.props.teams.error &&
          this.props.teams.teams.length > 0 &&
            <div>
              <div className="table-header">
                <span>Scoreboard</span>
                <span className="tip">
                  * You can switch the teams with the same number of points
                </span>
              </div>
              <div className="admin-table table">
                {
                  this.props.teams.teams.map((team, i) => (
                    <div key={team.transactionHash} className="tr">
                      <div className="td team-rank">{i + 1}.</div>
                      <div className="td team-name">{team.args.teamName}</div>
                      <div className="td team-address">{team.args.teamAddress}</div>
                      <div className="td team-points">{team.args.totalScore} PTS</div>
                      <div
                        className="td arrows"
                        onClick={() => this.props.moveTeamDown(i)}
                        role="button"
                        tabIndex="-1"
                      >
                        <img className="clickable" src={arrowdown} alt="Move a team down" />
                      </div>
                      <div
                        className="td arrows"
                        onClick={() => this.props.moveTeamUp(i)}
                        role="button"
                        tabIndex="-1"
                      >
                        <img className="clickable" src={arrowup} alt="Move a team up" />
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
        }
      </div>
    );
  }
}

Payout.propTypes = {
  teams: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    teams: PropTypes.array,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  }),
  user: PropTypes.shape({
    submittingPayout: PropTypes.bool.isRequired,
    submittingPayoutError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired
  }).isRequired,
  moveTeamUp: PropTypes.func.isRequired,
  moveTeamDown: PropTypes.func.isRequired,
  payoutTeams: PropTypes.func.isRequired,
  fetchTeamScores: PropTypes.func.isRequired,
};

Payout.defaultProps = {
  teams: {
    isFetching: true,
    teams: [1]
  }
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators({
  ...teamActions,
  ...userActions,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Payout);
