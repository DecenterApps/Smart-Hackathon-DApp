import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../../actions/userActions';
import AdminSponsorsForm from '../Admin/AdminSponsors/AdminSponsorsForm';

require('./_index.scss');

class Sponsor extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.checkUser();
  }

  render() {
    return (
      <div className="app">
        {
          this.props.user.phase > 2 &&
          <Redirect to="/" />
        }

        {
          this.props.sponsors.showThanks &&
          <div className="sponsor-thanks">Thanks for contributing!</div>
        }

        {
          !this.props.sponsors.showThanks &&
          <div className="form-wrapper">
            <div className="form-name">Contribute to prize pool</div>
            <AdminSponsorsForm submitText="Contribute" submitTextSubmitting="Contributing" />
          </div>
        }
      </div>
    );
  }
}

Sponsor.propTypes = {
  checkUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    phase: PropTypes.number.isRequired
  }).isRequired,
  sponsors: PropTypes.object.isRequired
};
const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => bindActionCreators({
  ...userActions
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sponsor);
