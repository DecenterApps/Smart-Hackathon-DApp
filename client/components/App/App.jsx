import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from '../Footer/Footer';
import AdminHeader from '../Header/index.jsx';
import AdminSponsorsForm from '../Admin/AdminSponsors/AdminSponsorsForm';
import * as userActions from '../../actions/userActions';

const styles = require('./app.scss');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.checkUser();
  }

  render() {
    return (
      <div className={styles.app}>
        <AdminHeader />

        <div className="form-name">Doprinesi nagradnom fondu</div>

        <div className="form-wrapper">
          <AdminSponsorsForm submitText="Doprinesi" submitTextSubmitting="Šalje se" />
        </div>

        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  checkUser: PropTypes.func.isRequired,
};
const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => bindActionCreators({
  ...userActions
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
