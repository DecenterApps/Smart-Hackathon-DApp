import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DollarIcon from '../Decorative/DollarIcon/index';
import Loader from '../Decorative/Loader/index';
import { fetchTeamScores } from '../../actions/teamActions';
import MedalIcon from '../Decorative/MedalIcon/MedalIcon';
import EthereumIcon from '../Decorative/EthereumIcon/EthereumIcon';

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
            <div className="scoreboard-regular-header">
              Scoreboard
            </div>
          }
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
              {
                this.props.teams.map((team, index) => (
                  <div className={`${index === (this.props.teams.length - 1) ? 'last-child' : ''} tr team`} key={team.transactionHash}>
                    <div className="td team-rank">#{index + 1}</div>

                    <div className="td medal">
                      { index === 0 && <MedalIcon color="#FFC107" />}
                      { index === 1 && <MedalIcon color="#BDBDBD" />}
                      { index === 2 && <MedalIcon color="#F57C00" />}
                    </div>

                    <div className="td team-name-wrapper">
                      <span className="team-name">{team.args.teamName}</span>
                    </div>

                    <div className="td members">{team.args.memberNames}</div>

                    <div
                      className="td total-points tooltips"
                    >
                      <div>{team.args.totalScore} PTS</div>
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
                            parseFloat(web3.fromWei(this.props.sponsors.ethPrize).toString())
                            / (2 ** (index + 1)) : 0
                        }
                      </span>
                      <span className="eth-icon-wrapper"><EthereumIcon /></span>
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
