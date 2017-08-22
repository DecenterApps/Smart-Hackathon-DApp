import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OpenModalButton from '../../components/OpenModalButton/OpenModalButton';

class AdminJudges extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div>
        {
          !this.props.judges.people.length > 0 &&
          <div className="empty-section">
            <div className="">
              <h1>Nema sudija</h1>
              <OpenModalButton text="Dodajte Sudiju" />
            </div>
          </div>
        }
        {
          this.props.judges.people.length > 0 &&
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

