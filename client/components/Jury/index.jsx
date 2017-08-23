import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as teamActions from '../../actions/teamActions';

import Header from '../Header/';
import arrowup from './assets/001-arrows.png';
import arrowdown from './assets/002-arrows-1.png';

require('./_index.scss');

class Jury extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.voteForTeams = this.voteForTeams.bind(this);
  }

  componentWillMount() {
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
        <Header />
        <div className="container white">
          <div className="table-header">
            <div className="title-wrapper">
              <p className="title">Cast Your Votes</p>
              <p className="subtitle">Arrange the teams in desired order.</p>
            </div>
            <button onClick={this.voteForTeams} className="submit-button">SUBMIT</button>
          </div>
          <table className="admin-table">
            <tbody>
              {
                this.props.teams &&
                this.props.teams.teams.map((team, i) => (
                  <tr key={team.transactionHash}>
                    <th className="order">{i + 1}.</th>
                    <th>{team.args.teamName}</th>
                    <td>{team.args.memberNames}</td>
                    <td>
                      <span onClick={() => this.props.moveTeamUp(i)} role="button" tabIndex="-1">
                        <img className="clickable" src={arrowup} alt="Move a team up" />
                      </span>
                    </td>
                    <td>
                      <span onClick={() => this.props.moveTeamDown(i)} role="button" tabIndex="-1">
                        <img className="clickable" src={arrowdown} alt="Move a team down" />
                      </span>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

Jury.propTypes = {
  teams: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    teams: PropTypes.array,
    error: PropTypes.object,
  }),
  fetchTeams: PropTypes.func.isRequired,
  moveTeamUp: PropTypes.func.isRequired,
  moveTeamDown: PropTypes.func.isRequired,
  vote: PropTypes.func.isRequired,
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
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Jury);

