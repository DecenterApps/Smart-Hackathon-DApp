import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AdminHeader from '../AdminHeader/index.jsx';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import OpenModalButton from '../../components/OpenModalButton/OpenModalButton';

require('./_index.scss');

const Admin = ({ children }) => (
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
          <OpenModalButton text="Dodaj" />
        </div>
      </div>
      { children }
      <ModalWrapper />
    </div>
  </div>
);

Admin.propTypes = {
  children: PropTypes.object.isRequired
};

export default Admin;

