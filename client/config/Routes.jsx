import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import App from '../components/App/App.jsx';
import Jury from '../components/Jury/index.jsx';
import Sponsor from '../components/Sponsor/index.jsx';
import Admin from '../components/Admin/index.jsx';
import AdminTeams from '../components/Admin/AdminTeams/index.jsx';
import AdminSponsors from '../components/Admin/AdminSponsors/index.jsx';
import AdminJudges from '../components/Admin/AdminJudges/index.jsx';
import Landing from '../components/Landing/index.jsx';
import HeaderStatus from '../components/Header/HeaderStatus/index';
import Footer from '../components/Footer/Footer';
import AdminOptions from '../components/Admin/AdminOptions/AdminOptions';

import { periodChangedListener } from '../actions/userActions';
import { judgeEventListener } from '../actions/judgeActions';
import { teamsEventListener } from '../actions/teamActions';
import { sponsorEventListener } from '../actions/sponsorActions';

class Routes extends Component {
  componentWillMount() {
    this.props.store.dispatch(periodChangedListener());
    this.props.store.dispatch(judgeEventListener());
    this.props.store.dispatch(teamsEventListener());
    this.props.store.dispatch(sponsorEventListener());
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <HashRouter>
          <div className="top-level-wrapper">
            <HeaderStatus />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/jury" component={Jury} />
              <Route path="/sponsor" component={Sponsor} />
              <Admin>
                <Route path="/admin/teams" component={AdminTeams} />
                <Route path="/admin/sponsors" component={AdminSponsors} />
                <Route path="/admin/judges" component={AdminJudges} />
                <Route path="/admin/options" component={AdminOptions} />
              </Admin>
            </Switch>
            <Footer />
          </div>
        </HashRouter>
      </Provider>
    );
  }
}


Routes.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Routes;
