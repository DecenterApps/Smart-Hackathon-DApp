import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../Decorative/Loader/index';
import { fetchTeamScores } from '../../actions/teamActions';
import MedalIcon from '../Decorative/MedalIcon/MedalIcon';

require('./scoreboard.scss');

let prizeIndex = 0;

class Scoreboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.renderReward = this.renderReward.bind(this);
  }

  renderReward(item) {
    if(prizeIndex + 1 === this.props.teams.length) {
      prizeIndex = 0;
    }
    if (!item.args.rewardEligible) {
      return (
        'N/A'
      );
    }

    prizeIndex++;

    return (
      parseFloat(this.props.sponsors.ethPrize)
      / (2 ** (prizeIndex + 1))
    );
  }

  render() {
    return (
      <div className="scoreboard">
        <div className="container white">
          {
            !this.props.isFetching &&
            this.props.teamsFetchError &&
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
            !this.props.isFetching &&
            !this.props.teamsFetchError &&
            this.props.teams.length > 0 &&
            <div className="table teams">
              <div className="tr team table-header">
                <div className="td team-rank">Rank</div>
                <div className="td medal" />
                <div className="td team-name-wrapper">Team</div>
                <div className="td members">Members</div>
                <div className="td total-points">Points</div>
                <div className="td reward-amount">Reward</div>

              </div>
              {
                this.props.teams.map((team, index) => (
                  <div
                    className={`${index === (this.props.teams.length - 1) ? 'last-child' : ''} tr team`}
                    key={team.transactionHash}
                  >
                    <div className="td team-rank">#{index + 1}</div>

                    <div className="td medal">
                      {index === 0 && <MedalIcon color="#FFC107" />}
                      {index === 1 && <MedalIcon color="#BDBDBD" />}
                      {index === 2 && <MedalIcon color="#F57C00" />}
                    </div>

                    <div className="td team-name-wrapper">
                      <span className="team-name">{team.args.teamName}</span>
                    </div>

                    <div className="td members">{team.args.memberNames}</div>

                    <div
                      className="td total-points tooltips"
                    >
                      <div>{team.args.totalScore}</div>
                      <span
                        className="tooltip-wrapper"
                        style={{ height: (team.args.scoreBreakdown.length * 31) + 'px' }}
                      >
                        {team.args.scoreBreakdown.map((juryVote) => (
                          <span className="jury-row" key={juryVote.juryMemberName}>
                            <span className="jury-name">{juryVote.juryMemberName}:</span>
                            <span className="jury-points">{juryVote.points} PTS</span>
                          </span>
                        ))}
                      </span>
                    </div>

                    <span className="td reward-amount">
                      <span className="reward-amount-eth">
                        {
                          team.args.rewardEligible ?
                            parseFloat(this.props.sponsors.ethPrize)
                            / (2 ** (index + 1)) : 0
                        } ETH
                        {this.renderReward(team)}
                      </span>
                    </span>
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
