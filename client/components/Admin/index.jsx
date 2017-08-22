import React from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import AdminHeader from '../AdminHeader/index.jsx';

require('./_index.scss');

const Admin = ({ location, children }) => (
  <div>
    <AdminHeader />
    <div className="container white">
      <div className="tab-wrapper">
        <div className="left-section">
          <a href="#/admin/teams" className={location.pathname === '/admin/' || location.pathname === '/admin/teams' ? 'active' : ''}>Timovi</a>
          <a href="#/admin/sponsors" className={location.pathname === '/admin/sponsors' ? 'active' : ''}>Sponzori</a>
          <a href="#/admin/judges" className={location.pathname === '/admin/judges' ? 'active' : ''}>Sudije</a>
        </div>
        <div className="right-section">
          Dodaj
        </div>
      </div>
      {children}
    </div>
  </div>
);

Admin.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired
};

const mapStateToProps = (state) => ({
  location: state.routing.locationBeforeTransitions
});

export default connect(mapStateToProps)(Admin);

