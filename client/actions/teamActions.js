import { TEAMS_FETCH, TEAMS_SUCCESS, TEAMS_ERROR, ADD_TEAM, ADD_TEAM_ERROR, ADD_TEAM_SUCCESS } from './types';
import { toggleModal } from './modalsActions';

import * as eth from '../modules/ethereumService';

const teamsFormValidator = (values) => {
  const errors = {};

  if (!values.name) errors.name = 'Obavezno';

  if (!values.address) errors.address = 'Obavezno';

  if (values.address) errors.address = !web3.isAddress(values.address);

  if (!values.teamMembers) errors.teamMembers = 'Obavezno';

  if (values.teamMembers) {
    const teamMembers = values.teamMembers.split(', ');
    teamMembers.reduce((sum, val) => {
      if (val.indexOf(',') > 0) errors.teamMembers = 'Pravilno razdvoji';
      return sum.concat(`, ${val}`);
    }, '');
  }

  return errors;
};

const submitAddTeamsForm = (team) => (dispatch, getState) => {
  dispatch({ type: ADD_TEAM });

  eth._registerTeam(team.name, team.address, team.teamMembers, team.excludeFromPrize)
    .then((res) => {
      dispatch({ type: ADD_TEAM_SUCCESS, payload: { team: res } });
      toggleModal(getState().routing.locationBeforeTransitions.pathname, false);
    })
    .catch((error) => {
      dispatch({ type: ADD_TEAM_ERROR, payload: { addTeamError: error.message } });
    });
};

const fetchTeams = () => (dispatch) => {
  dispatch({ type: TEAMS_FETCH });

  eth.getTeams()
    .then((res) => {
      dispatch({ type: TEAMS_SUCCESS, teams: res });
    })
    .catch((error) => {
      dispatch({ type: TEAMS_ERROR, error });
    });
};

module.exports = {
  fetchTeams, teamsFormValidator, submitAddTeamsForm
};
