import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import React from 'react';
import PropTypes from 'prop-types';
import App from '../components/App/App.jsx';
import Jury from '../components/Jury/index.jsx';
import Admin from '../components/Admin/index.jsx';
import AdminTeams from '../components/Admin/AdminTeams/index.jsx';
import AdminSponsors from '../components/Admin/AdminSponsors/index.jsx';
import AdminJudges from '../components/Admin/AdminJudges/index.jsx';
import AdminChangePhase from '../components/Admin/AdminChangePhase/AdminChangePhase';

const myRouter = ({ store, history }) => (
  <div>
    {
      store.getState().user.isDetermined &&
      store.getState().user.type === 'admin' &&
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Admin}>
            <IndexRoute component={AdminTeams} />
            <Route path="teams" component={AdminTeams} />
            <Route path="sponsors" component={AdminSponsors} />
            <Route path="judges" component={AdminJudges} />
          </Route>
          <Route path="*" component={Admin} />
        </Router>
      </Provider>
    }
    {
      store.getState().user.isDetermined &&
      store.getState().user.type === 'other' &&
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App} />
          <Route path="*" component={App} />
        </Router>
      </Provider>
    }
    {
      store.getState().user.isDetermined &&
      store.getState().user.type === 'jury' &&
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Jury} />
          <Route path="*" component={App} />
        </Router>
      </Provider>
    }
  </div>
);

myRouter.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default myRouter;
