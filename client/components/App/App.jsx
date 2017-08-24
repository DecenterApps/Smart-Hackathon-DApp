import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from '../Footer/Footer';
import AdminHeader from '../Header/HeaderStatus/index';
import AdminSponsorsForm from '../Admin/AdminSponsors/AdminSponsorsForm';
import { checkUser } from '../../actions/userActions';
import Scoreboard from '../Scoreboard/Scoreboard';

const styles = require('./app.scss');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.$checkUser();
  }

  render() {
    return (
      <div className={styles.app}>
        <AdminHeader />

        <div className="form-wrapper">
          <div className="form-name">Contribute to prize pool</div>
          <AdminSponsorsForm submitText="Contribute" submitTextSubmitting="Contributing" />
        </div>

        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  $checkUser: PropTypes.func.isRequired
};

export default connect(null, { $checkUser: checkUser })(App);
