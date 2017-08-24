import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DollarIcon from '../Decorative/DollarIcon/index';
import Loader from '../Decorative/Loader/index';
import { fetchTeamScores } from '../../actions/teamActions';

require('./scoreboard.scss');

class Scoreboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="scoreboard">
        <div className="container white">
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
                      <span className="team-name">{team.args.teamName}</span>
                    </div>

                    <div className="td members">{team.args.memberNames}</div>

                    <div className="td total-points">
                      {this.props.sponsors.ethPrize / (2 ** (index + 1))}
                    </div>

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
  teamsFetchError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
  sponsors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  teams: state.teams.teams,
  isFetching: state.teams.isFetching,
  teamsFetchError: state.teams.error,
  sponsors: state.sponsors,
});

export default connect(mapStateToProps, {})(Scoreboard);
