import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OpenModalButton from '../../OpenModalButton/OpenModalButton';
import sponsorActions from '../../../actions/sponsorActions';
import Loader from '../../Decorative/Loader/index.jsx';

class AdminSponsors extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentWillMount() {
    this.props.fetchSponsors();
  }
  render() {
    return (
      <div>
        {
          this.props.sponsors.isFetching &&
          <div className="empty-section">
            <h1><Loader color="#777" />Loading</h1>
          </div>
        }
        {
          !this.props.sponsors.isFetching &&
          this.props.sponsors.error &&
          <div className="empty-section">
            <h1>{this.props.sponsors.error.toString()}</h1>
          </div>
        }
        {
          !this.props.sponsors.isFetching &&
          !this.props.sponsors.sponsors.length > 0 &&
          <div className="empty-section">
            <div className="">
              <h1>No sponsors</h1>
              <OpenModalButton text="Add sponsor" />
            </div>
          </div>
        }

        {
          !this.props.sponsors.isFetching &&
          this.props.sponsors.sponsors.length > 0 &&
          <table className="display-table">
            <tbody>
              {
                this.props.sponsors.sponsors.map((sponsor) => (
                  <tr key={sponsor.transactionHash}>
                    <th>{sponsor.args.sponsorName}</th>
                    <td>{web3.fromWei(sponsor.args.amount).toString()} ETH</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        }
      </div>
    );
  }
}

AdminSponsors.propTypes = {
  sponsors: PropTypes.shape({
    sponsors: PropTypes.array,
    isFetching: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  }),
  fetchSponsors: PropTypes.func.isRequired
};
AdminSponsors.defaultProps = {
  sponsors: {
    sponsors: []
  },
  isFetching: true
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators({
  ...sponsorActions
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminSponsors);

