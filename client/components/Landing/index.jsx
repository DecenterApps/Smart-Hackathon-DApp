import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import userActions from '../../actions/userActions';
import teamActions from '../../actions/teamActions';
import sponsorActions from '../../actions/sponsorActions';

import Scoreboard from '../Scoreboard/Scoreboard';
import DollarIcon from '../Decorative/DollarIcon/index.jsx';

require('./_index.scss');

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentWillMount() {
    this.props.checkUser();
    this.props.fetchTeams();
    this.props.fetchSponsors();
  }
  render() {
    return (
      <div>
        <div className="container white landing-wrapper">
          {
            this.props.user.phase === 0 &&
            <div>
              <h1>Welcome to Startit Blockchain Hackathon</h1>
              <p>
                The competition has not started yet.
                Feel free to <Link to="/sponsor">contribute</Link>.
              </p>
            </div>
          }
          {
            this.props.user.phase === 1 &&
            <div>
              <h1>Competition is ongoing. </h1>
            </div>
          }
          {
            (this.props.user.phase === 2 ||
             this.props.user.phase === 3) &&
             <div>
               <h1>The judges are voting. </h1>
             </div>
          }
          {
            (this.props.user.phase === 0 ||
             this.props.user.phase === 1 ||
             this.props.user.phase === 2 ||
             this.props.user.phase === 3) &&
             this.props.teams.teams.length > 0 &&
             <div className="table-wrapper">
               <h2>Teams: </h2>
               <table className="display-table">
                 <tbody>
                   {
                     this.props.teams.teams.map((team) => (
                       <tr key={team.transactionHash}>
                         <th className="rewardable"><DollarIcon color={team.args.rewardEligible ? '#44ca44' : '#eee'} /></th>
                         <th>{team.args.teamName}</th>
                         <td>{team.args.memberNames}</td>
                         <td><a href={`https://etherscan.io/address/${team.args.teamAddress}`}>{team.args.teamAddress}</a></td>
                       </tr>
                     ))
                   }
                 </tbody>
               </table>
             </div>
          }
          {
            (this.props.user.phase === 0 ||
              this.props.user.phase === 1 ||
              this.props.user.phase === 2 ||
              this.props.user.phase === 3) &&
             this.props.sponsors.sponsors.length > 0 &&
             <div className="sponsors-wrapper">
               <h2>Sponsors: </h2>
               {
                 this.props.sponsors.sponsors.map((sponsor) => (
                   <div className="sponsor-wrapper" key={sponsor.transactionHash}>
                     <a href={sponsor.args.sponsorSite}>
                       <span className="logo" style={{ backgroundImage: `url("${sponsor.args.sponsorLogoUrl}")` }} />
                       <span>{sponsor.args.sponsorName}</span>
                     </a>
                   </div>
                 ))
               }
             </div>
          }
          {
            this.props.user.phase === 4 &&
            <div>
              <h1>Thanks for being a part of Startit Blockchain Hackathon!</h1>

              <div className="table-wrapper">
                <h2>Here are the winners: </h2>
                <Scoreboard />
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  user: PropTypes.object.isRequired,
  teams: PropTypes.shape({
    teams: PropTypes.array,
  }),
  sponsors: PropTypes.shape({
    sponsors: PropTypes.array,
  }),
  checkUser: PropTypes.func.isRequired,
  fetchTeams: PropTypes.func.isRequired,
  fetchSponsors: PropTypes.func.isRequired,
};

Landing.defaultProps = {
  teams: {
    teams: []
  },
  sponsors: {
    sponsors: []
  },
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators({
  ...userActions,
  ...teamActions,
  ...sponsorActions,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Landing);

