import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from '../Footer/Footer';
import AdminHeader from '../Header/AdminHeader';
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
        <AdminHeader />

        <div className="container white">
          <div className="container-title">Scoreboard</div>

          {
            !this.props.isFetching &&
            !this.props.teamsFetchError &&
            !this.props.teams.length > 0 &&
            <div className="empty-section">
              Došlo je do greške
            </div>
          }

          {
            this.props.isFetching &&
            <div className="empty-section">
              <h1><Loader color="#777" />Učitavanje</h1>
            </div>
          }

          {
            <div className="teams">
              {
                this.props.teams.map((team, index) => (
                  <div className="team" key={team.transactionHash}>
                    <span className="rank">#{index + 1}</span>
                    <span className="medal" />

                    <span className="team-name-wrapper">
                      <span className="rewardable">
                        <DollarIcon color={team.args.rewardEligible ? '#44ca44' : '#eee'} />
                      </span>

                      <span className="team-name">{team.args.teamName}</span>
                    </span>

                    <span className="members">{team.args.memberNames}</span>
                  </div>
                ))
              }
            </div>
          }
        </div>

        <Footer />
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
