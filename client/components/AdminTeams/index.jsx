import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
          !this.props.teams.teams.length &&
          <div className="empty-section">
            <div className="">
              <h1>Nema timova</h1>
              <button>Dodajte tim</button>
            </div>
          </div>
        }
        {
          this.props.teams.teams.length &&
          <table className="admin-table">
            <tbody>
              <tr>
                <td className="is excluded" />
                <th>Name 1</th>
                <td>Data</td>
              </tr>
              <tr>
                <td className="excluded" />
                <th>Name 1</th>
                <td>Data</td>
              </tr>
              <tr>
                <td className="excluded" />
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
    teams: PropTypes.array
  })
};
AdminTeams.defaultProps = {
  teams: {
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

