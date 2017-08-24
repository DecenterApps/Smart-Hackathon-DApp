import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import formGroup from '../../FormComonent/FormComponent';
import { teamsFormValidator, submitAddTeamsForm } from '../../../actions/teamActions';
import CubeLoader from '../../Decorative/CubeLoader/CubeLoader';

require('../../FormComonent/forms.scss');

let AdminTeamsForm = ({ handleSubmit, pristine, submittingForm, invalid, addTeamError }) => ( // eslint-disable-line
  <form onSubmit={handleSubmit}>
    <Field
      name="name"
      showErrorText
      component={formGroup}
      placeholder="Name"
      type="text"
      wrapperClassName="form-item-wrapper"
      inputClassName="form-item"
      errorClassName="form-item-error"
    />

    <Field
      name="address"
      showErrorText
      component={formGroup}
      placeholder="Ethereum address"
      type="text"
      wrapperClassName="form-item-wrapper"
      inputClassName="form-item"
      errorClassName="form-item-error"
    />

    <Field
      name="teamMembers"
      showErrorText
      component={formGroup}
      placeholder="Team members (separate by commas)"
      type="text"
      wrapperClassName="form-item-wrapper"
      inputClassName="form-item"
      errorClassName="form-item-error"
    />

    <Field
      name="excludeFromPrize"
      component={formGroup}
      showLabel
      labelText="Exclude from prize pool"
      type="checkbox"
      id="excludeFromPrizeId"
      wrapperClassName="form-item-wrapper-checkbox"
      inputClassName="form-item-checkbox"
      errorClassName="form-item-error"
    />

    { addTeamError && <div className="submit-error">Error: {addTeamError}</div> }

    <button
      className="submit-button"
      type="submit"
      disabled={pristine || submittingForm || invalid}
    >
      { submittingForm && <CubeLoader /> }
      { submittingForm ? 'Submitting' : 'Submit' }
    </button>
  </form>
);

const mapStateToProps = (state) => ({
  submittingForm: state.teams.submitting,
  addTeamError: state.teams.addTeamError
});

const validate = teamsFormValidator;

AdminTeamsForm = reduxForm({ form: 'teamsForm', validate })(AdminTeamsForm);

export default connect(mapStateToProps, { onSubmit: submitAddTeamsForm })(AdminTeamsForm);
