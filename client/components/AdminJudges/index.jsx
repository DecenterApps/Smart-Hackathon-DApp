import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AdminJudges extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div>
        {
          !this.props.judges.people.length &&
          <div className="empty-section">
            <div className="">
              <h1>Nema sudija</h1>
              <button>Dodajte sudiju</button>
            </div>
          </div>
        }
        {
          this.props.judges.people.length &&
          <table className="admin-table">
            <tr>
              <th>Name 1</th>
              <td>Data</td>
            </tr>
          </table>
        }
      </div>
    );
  }
}

AdminJudges.propTypes = {
  judges: PropTypes.shape({
    people: PropTypes.array
  })
};
AdminJudges.defaultProps = {
  judges: {
    people: []
  }
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminJudges);

