import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DollarIcon from '../Decorative/DollarIcon/index';
import Loader from '../Decorative/Loader/index';
import { fetchTeams } from '../../actions/teamActions';

require('./scoreboard.scss');

class Scoreboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentWillMount() {
    this.props.$fetchTeams();
  }

  render() {
    return (
      <div className="scoreboard">
        <div className="container white">
          <div className="container-title">Scoreboard</div>

          {
            !this.props.isFetching &&
            !this.props.teamsFetchError &&
            !this.props.teams.length > 0 &&
            <div className="empty-section">
              Error occurred
            </div>
          }

          {
            this.props.isFetching &&
            <div className="empty-section">
              <h1><Loader color="#777" />Loading</h1>
            </div>
          }

          {
            <div className="table teams">
              {
                this.props.teams.map((team, index) => (
                  <div className="tr team" key={team.transactionHash}>
                    <div className="td team-rank">#{index + 1}</div>

                    <div className="td medal" />

                    <div className="td team-name-wrapper">
                      <span className="rewardable">
                        <DollarIcon color={team.args.rewardEligible ? '#44ca44' : '#eee'} />
                      </span>

                      <span className="team-name">{team.args.teamName}</span>
                    </div>

                    <div className="td members">{team.args.memberNames}</div>

                    <div className="td total-points">{team.args.points}</div>

                    <span className="td reward-amount">{team.args.reward}</span>
                  </div>
                ))
              }
            </div>
          }
        </div>
      </div>
    );
  }
}

Scoreboard.propTypes = {
  teams: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  $fetchTeams: PropTypes.func.isRequired,
  teamsFetchError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired
};

const mapStateToProps = (state) => ({
  teams: state.teams.teams,
  isFetching: state.teams.isFetching,
  teamsFetchError: state.teams.error
});

export default connect(mapStateToProps, { $fetchTeams: fetchTeams })(Scoreboard);
