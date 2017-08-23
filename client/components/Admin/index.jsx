import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import AdminHeader from '../Header/AdminHeader/index.jsx';
import ModalWrapper from '../Modals/ModalWrapper/ModalWrapper';
import OpenModalButton from '../../components/OpenModalButton/OpenModalButton';
import Footer from '../Footer/Footer';
import userActions from '../../actions/userActions';

require('./_index.scss');

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentWillMount() {
    this.props.checkUser();
  }
  render() {
    return (
      <div>
        {
          this.props.user.isDetermined &&
          this.props.user.type === 'administrator' &&
          <div>
            <AdminHeader />
            <div className="container white">
              <div className="tab-wrapper">
                <div className="left-section">
                  <Link to="/admin/teams" className={location.hash === '#/admin/' || location.hash === '#/admin' || location.hash === '#/admin/teams' ? 'active' : ''}>Timovi</Link>
                  <Link to="/admin/sponsors" className={location.hash === '#/admin/sponsors' ? 'active' : ''}>Sponzori</Link>
                  <Link to="/admin/judges" className={location.hash === '#/admin/judges' ? 'active' : ''}>Sudije</Link>
                  <Link to="/admin/change-period" className={location.hash === '#/admin/change-period' ? 'active' : ''}>Promeni period</Link>
                </div>
                <div className="right-section">
                  {location.hash !== '#/admin/change-period' && <OpenModalButton text="Dodaj" /> }
                </div>
              </div>
              { this.props.children }
              <ModalWrapper />
            </div>
            <Footer />
          </div>
        }

        {
          this.props.user.isDetermined &&
          this.props.user.type !== 'administrator' &&
          <Redirect to="/" />
        }

        {
          this.props.user.isDetermined &&
          this.props.user.type === 'administrator' &&
          (location.hash === '#/admin/' || location.hash === '#/admin') &&
          <Redirect to="/admin/teams" />
        }
      </div>
    );
  }
}

Admin.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  user: PropTypes.object.isRequired,
  checkUser: PropTypes.func.isRequired,
};


const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators({
  ...userActions
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Admin);
