import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import formGroup from '../FormComonent/FormComponent';
import { sponsorsFormValidator, submitAddSponsorsForm } from '../../actions/sponsorActions';
import CubeLoader from '../Decorative/CubeLoader/CubeLoader';

const styles = require('../FormComonent/forms.scss');

let SponsorsTeamsForm = ({ handleSubmit, pristine, submittingForm, invalid, addSponsorError }) => ( // eslint-disable-line
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
      name="amount"
      component={formGroup}
      placeholder="Kolicina donacije (decimala ide iza tacke)"
      type="text"
      wrapperClassName="form-item-wrapper"
      inputClassName="form-item"
      errorClassName="form-item-error"
    />

    <Field
      name="logoUrl"
      component={formGroup}
      placeholder="Logo URL"
      type="text"
      wrapperClassName="form-item-wrapper"
      inputClassName="form-item"
      errorClassName="form-item-error"
    />

    <Field
      name="websiteUrl"
      component={formGroup}
      placeholder="URL sajta"
      type="text"
      wrapperClassName="form-item-wrapper"
      inputClassName="form-item"
      errorClassName="form-item-error"
    />

    { addSponsorError && <div className="submit-error">Error: {addSponsorError}</div> }

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
  submittingForm: state.sponsors.submitting,
  addSponsorError: state.sponsors.addSponsorError
});

const validate = sponsorsFormValidator;

SponsorsTeamsForm = reduxForm({ form: 'sponsorsForm', validate })(SponsorsTeamsForm);

export default connect(mapStateToProps, { onSubmit: submitAddSponsorsForm })(SponsorsTeamsForm);
