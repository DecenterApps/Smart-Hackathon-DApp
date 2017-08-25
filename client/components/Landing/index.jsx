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
    this.props.fetchSponsors();
    this.props.fetchPrizePoolSize();
    if(this.props.user.phase === 0) {
      this.props.fetchTeams();
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.user.phase !== this.props.user.phase) {
      console.log(nextProps.user.phase, this.props.user.phase);
      if(this.props.user.phase === 4) {
        this.props.fetchTeamScores();
      } else {
        this.props.fetchTeams();
      }
    }
  }
  render() {
    return (
      <div>
        <div className={`${this.props.user.phase === 4 ? 'last-phase' : ''} container white landing-wrapper`}>
          {
            this.props.user.phase === 0 &&
            <div>
              <h1>Welcome to Startit Blockchain Hackathon</h1>
              <p>
                The competition has not started yet.
                <br />If you are a competitor, please make sure your details below are correct,
                especially Ethereum address!
                <br />
                You can also <Link to="/sponsor">contribute</Link> to the prize pool.
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
               <h1>The judges are voting, please be patient. </h1>
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
                         <th className="rewardable" title={team.args.rewardEligible ? 'Eligible for reward' : 'Not eligible for reward'}>
                           <DollarIcon color={team.args.rewardEligible ? '#44ca44' : '#eee'} />
                         </th>
                         <th>{team.args.teamName}</th>
                         <td>{team.args.memberNames}</td>
                         <td>
                           <a href={`https://etherscan.io/address/${team.args.teamAddress}`} target="_blank" rel="noopener">
                             {team.args.teamAddress}
                           </a>
                         </td>
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
               {
                 this.props.sponsors.ethPrize &&
                 <h2>
                   Total prize pool: { this.props.sponsors.ethPrize } ETH
                   {
                     this.props.sponsors.eurPrize &&
                     <span> ({ this.props.sponsors.eurPrize } EUR)</span>
                   }
                 </h2>
               }
               <h2>Sponsors: </h2>
               {
                 this.props.sponsors.sponsors.map((sponsor) => (
                   <div className="sponsor-wrapper" key={sponsor.transactionHash}>
                     <a
                       href={sponsor.args.sponsorSite.substr(0, 4) === 'http' ? sponsor.args.sponsorSite : 'http://' + sponsor.args.sponsorSite}
                       target="_blank"
                       rel="noopener"
                     >
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
            <div className="end-wrapper">
              <h1>Thanks for being a part of Startit Blockchain Hackathon!</h1>

              <div className="table-wrapper">
                <h2 className="scoreboard-header">Here is the final scoreboard:</h2>
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
    ethPrize: PropTypes.string,
    eurPrize: PropTypes.string,
  }),
  checkUser: PropTypes.func.isRequired,
  fetchTeams: PropTypes.func.isRequired,
  fetchTeamScores: PropTypes.func.isRequired,
  fetchSponsors: PropTypes.func.isRequired,
  fetchPrizePoolSize: PropTypes.func.isRequired,
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

