import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import formGroup from '../FormComonent/FormComponent';
import { teamsFormValidator, submitAddTeamsForm } from '../../actions/teamActions';
import CubeLoader from '../CubeLoader/CubeLoader';

const styles = require('../FormComonent/forms.scss');

let AdminTeamsForm = ({ handleSubmit, pristine, submittingForm, invalid, addTeamError }) => ( // eslint-disable-line
  <form className={styles['authentication-form']} onSubmit={handleSubmit}>
    <Field
      name="name"
      component={formGroup}
      placeholder="Ime"
      type="text"
      wrapperClassName="form-item-wrapper"
      inputClassName="form-item"
      errorClassName="form-item-error"
    />

    <Field
      name="address"
      component={formGroup}
      placeholder="Ethereum adresa"
      type="text"
      wrapperClassName="form-item-wrapper"
      inputClassName="form-item"
      errorClassName="form-item-error"
    />

    <Field
      name="teamMembers"
      component={formGroup}
      placeholder="Clanovi tima (razdvojiti zarezima)"
      type="text"
      wrapperClassName="form-item-wrapper"
      inputClassName="form-item"
      errorClassName="form-item-error"
    />

    <Field
      name="excludeFromPrize"
      component={formGroup}
      showLabel
      labelText="Izuzmi iz nagrade"
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
      { submittingForm ? 'Dodaje se' : 'Dodaj' }
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
