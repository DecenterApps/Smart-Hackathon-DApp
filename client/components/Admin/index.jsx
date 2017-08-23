import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import AdminHeader from '../Header/AdminHeader/index.jsx';
import ModalWrapper from '../Modals/ModalWrapper/ModalWrapper';
import OpenModalButton from '../../components/OpenModalButton/OpenModalButton';
import Footer from '../Footer/Footer';

require('./_index.scss');

const Admin = ({ children }) => (
  <div>
    <AdminHeader />
    <div className="container white">
      <div className="tab-wrapper">
        <div className="left-section">
          <Link to="admin/teams" className={location.hash === '#/admin/' || location.hash === '#/admin' || location.hash === '#/admin/teams' ? 'active' : ''}>Timovi</Link>
          <Link to="admin/sponsors" className={location.hash === '#/admin/sponsors' ? 'active' : ''}>Sponzori</Link>
          <Link to="admin/judges" className={location.hash === '#/admin/judges' ? 'active' : ''}>Sudije</Link>
        </div>
        <div className="right-section">
          <OpenModalButton text="Dodaj" />
        </div>
      </div>
      { children }
      <ModalWrapper />
    </div>
    <Footer />
  </div>
);

Admin.propTypes = {
  children: PropTypes.object.isRequired
};

export default Admin;

