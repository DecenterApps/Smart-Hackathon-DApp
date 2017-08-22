import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DollarIcon from '../Decorative/DollarIcon/index.jsx';
import Loader from '../Decorative/Loader/index.jsx';
import OpenModalButton from '../../components/OpenModalButton/OpenModalButton';

require('./_index.scss');

class AdminTeams extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div>
        {
          this.props.teams.isFetching &&
          <div className="empty-section">
            <h1><Loader color="#777" />Učitavanje</h1>
          </div>
        }
        {
          !this.props.teams.isFetching &&
          !this.props.teams.teams.length > 0 &&
          <div className="empty-section">
            <div className="">
              <h1>Nema timova</h1>
              <OpenModalButton text="Dodajte tim" />
            </div>
          </div>
        }
        {
          !this.props.teams.isFetching &&
          this.props.teams.teams.length > 0 &&
          <table className="admin-table">
            <tbody>
              <tr>
                <th className="rewardable"><DollarIcon color={true ? '#44ca44' : '#eee'} /></th>
                <th>Name 1</th>
                <td>Data</td>
              </tr>
              <tr>
                <th className="rewardable"><DollarIcon color={false ? '#44ca44' : '#eee'} /></th>
                <th>Name 1</th>
                <td>Data</td>
              </tr>
              <tr>
                <th className="rewardable"><DollarIcon color={false ? '#44ca44' : '#eee'} /></th>
                <th>Name 1</th>
                <td>Data</td>
              </tr>
            </tbody>
          </table>
        }
      </div>
    );
  }
}

AdminTeams.propTypes = {
  teams: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    teams: PropTypes.array
  })
};

AdminTeams.defaultProps = {
  teams: {
    isFetching: true,
    teams: [1]
  }
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminTeams);

