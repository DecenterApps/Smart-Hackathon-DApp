import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OpenModalButton from '../../components/OpenModalButton/OpenModalButton';

class AdminSponsors extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div>
        {
          !this.props.sponsors.sponsors.length > 0 &&
          <div className="empty-section">
            <div className="">
              <h1>Nema sponzora</h1>
              <OpenModalButton text="Dodajte Sponzora" />
            </div>
          </div>
        }

        {
          this.props.sponsors.sponsors.length > 0 &&
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

