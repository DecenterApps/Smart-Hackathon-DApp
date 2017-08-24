import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import App from '../components/App/App.jsx';
import Jury from '../components/Jury/index.jsx';
import Admin from '../components/Admin/index.jsx';
import AdminTeams from '../components/Admin/AdminTeams/index.jsx';
import AdminSponsors from '../components/Admin/AdminSponsors/index.jsx';
import AdminJudges from '../components/Admin/AdminJudges/index.jsx';
import AdminChangePhase from '../components/Admin/AdminChangePhase/AdminChangePhase';
import Scoreboard from '../components/Scoreboard/Scoreboard';
import Landing from '../components/Landing/index.jsx';

const Routes = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/jury" component={Jury} />
        <Admin>
          <Route path="/admin/teams" component={AdminTeams} />
          <Route path="/admin/sponsors" component={AdminSponsors} />
          <Route path="/admin/judges" component={AdminJudges} />
          <Route path="/admin/change-period" component={AdminChangePhase} />
        </Admin>
      </Switch>
    </HashRouter>
  </Provider>
);

Routes.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Routes;
