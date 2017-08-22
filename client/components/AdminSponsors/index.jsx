import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AdminSponsors extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div>
        {
          !this.props.sponsors.sponsors.length &&
          <div className="empty-section">
            <div className="">
              <h1>Nema sponzora</h1>
              <button>Dodajte sponzora</button>
            </div>
          </div>
        }
        {
          this.props.sponsors.sponsors.length &&
          <table className="admin-table">
            <tr>
              <th>Sponsor name</th>
              <td>Other data</td>
            </tr>
          </table>
        }
      </div>
    );
  }
}

AdminSponsors.propTypes = {
  sponsors: PropTypes.shape({
    sponsors: PropTypes.array
  })
};
AdminSponsors.defaultProps = {
  sponsors: {
    sponsors: []
  }
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminSponsors);

