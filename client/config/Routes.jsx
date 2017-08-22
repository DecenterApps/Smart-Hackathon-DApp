import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import React from 'react';
import PropTypes from 'prop-types';
import App from '../components/App/App.jsx';
import Admin from '../components/Admin/index.jsx';
import AdminTeams from '../components/AdminTeams/index.jsx';
import AdminSponsors from '../components/AdminSponsors/index.jsx';
import AdminJudges from '../components/AdminJudges/index.jsx';

const myRouter = ({ store, history }) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
      <Route path="/admin" component={Admin}>
        <IndexRoute component={AdminTeams} />
        <Route path="teams" component={AdminTeams} />
        <Route path="sponsors" component={AdminSponsors} />
        <Route path="judges" component={AdminJudges} />
      </Route>
      <Route path="*" component={App} />
    </Router>
  </Provider>
);

myRouter.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default myRouter;
