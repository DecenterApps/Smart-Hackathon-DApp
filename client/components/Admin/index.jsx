import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import ModalWrapper from '../Modals/ModalWrapper/ModalWrapper';
import OpenModalButton from '../../components/OpenModalButton/OpenModalButton';
import userActions from '../../actions/userActions';

require('./_index.scss');

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    this.props.checkUser();
  }
  render() {
    return (
      <div>
        {
          this.props.user.isDetermined &&
          this.props.user.type === 'administrator' &&
          <div>
            <div className="container white">
              <div className="tab-wrapper">
                <div className="left-section">
                  <Link to="/admin/teams" className={location.hash === '#/admin/' || location.hash === '#/admin' || location.hash === '#/admin/teams' ? 'active' : ''}>Teams</Link>
                  <Link to="/admin/sponsors" className={location.hash === '#/admin/sponsors' ? 'active' : ''}>Sponsors</Link>
                  <Link to="/admin/judges" className={location.hash === '#/admin/judges' ? 'active' : ''}>Judges</Link>
                  <Link to="/admin/change-period" className={location.hash === '#/admin/change-period' ? 'active' : ''}>Change period</Link>
                </div>

                <div className="right-section">
                  {
                    (location.hash === '#/admin/' || location.hash === '#/admin' || location.hash === '#/admin/teams') &&
                    this.props.teams.teams.length > 0 &&
                    <OpenModalButton text="Add team" showIcon />
                  }
                  {
                    (location.hash === '#/admin/sponsors') && this.props.sponsors.sponsors.length > 0 &&
                    <OpenModalButton text="Add sponsor" showIcon />
                  }
                  {
                    (location.hash === '#/admin/judges') && this.props.judges.judges.length > 0 &&
                    <OpenModalButton text="Add Judge" showIcon />
                  }
                </div>
              </div>
              { this.props.children }
              <ModalWrapper />
            </div>
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
  teams: PropTypes.object.isRequired,
  sponsors: PropTypes.object.isRequired,
  judges: PropTypes.object.isRequired,
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
