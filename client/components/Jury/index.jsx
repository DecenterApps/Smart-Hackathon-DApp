import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as teamActions from '../../actions/teamActions';
import userActions from '../../actions/userActions';

import Header from '../Header/';
import Loader from '../Decorative/Loader/';
import arrowup from './assets/001-arrows.png';
import arrowdown from './assets/002-arrows-1.png';

require('./_index.scss');

class Jury extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.voteForTeams = this.voteForTeams.bind(this);
  }

  componentDidMount() {
    this.props.checkUser();
    this.props.fetchTeams();
  }

  voteForTeams() {
    const votes = this.props.teams.teams.map((elem) => elem.args.teamAddress);

    console.log(votes);

    this.props.vote(votes);
  }

  render() {
    return (
      <div>
        {
          this.props.user.isDetermined &&
          this.props.user.type === 'jury' &&
          <div>
            <Header />
            <div className="container white">
              <div className="table-header">
                <div className="title-wrapper">
                  <p className="title">Cast Your Votes</p>
                  <p className="subtitle">Arrange the teams in desired order.</p>
                </div>
                <button onClick={this.voteForTeams} className="submit-button">SUBMIT</button>
              </div>
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
                this.props.teams &&
                this.props.teams.teams.map((team, i) => (
                  <table key={team.transactionHash} className="display-table">
                    <tbody>
                      <tr>
                        <th className="order">{i + 1}.</th>
                        <th>{team.args.teamName}</th>
                        <td>{team.args.memberNames}</td>
                        <span
                          className="arrows"
                          onClick={() => this.props.moveTeamDown(i)}
                          role="button"
                          tabIndex="-1"
                        >
                          <img className="clickable" src={arrowdown} alt="Move a team down" />
                        </span>
                        <span
                          className="arrows"
                          onClick={() => this.props.moveTeamUp(i)}
                          role="button"
                          tabIndex="-1"
                        >
                          <img className="clickable" src={arrowup} alt="Move a team up" />
                        </span>
                      </tr>
                    </tbody>
                  </table>
                ))
              }
            </div>
          </div>
        }

        {
          this.props.user.isDetermined &&
          this.props.user.type !== 'jury' &&
          <Redirect to="/" />
        }

      </div>
    );
  }
}

Jury.propTypes = {
  teams: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    teams: PropTypes.array,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  }),
  fetchTeams: PropTypes.func.isRequired,
  moveTeamUp: PropTypes.func.isRequired,
  moveTeamDown: PropTypes.func.isRequired,
  vote: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  checkUser: PropTypes.func.isRequired,
};

Jury.defaultProps = {
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
)(Jury);

