import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from '../Header/index.jsx';

require('./_index.scss');

const AdminHeader = () => (
  <div>
    <Header>
      <button className="header-button">Promeni fazu</button>
    </Header>
  </div>
);

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminHeader);

