import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import formGroup from '../../FormComonent/FormComponent';
import { sponsorsFormValidator, submitAddSponsorsForm } from '../../../actions/sponsorActions';
import CubeLoader from '../../Decorative/CubeLoader/CubeLoader';

require('../../FormComonent/forms.scss');

let SponsorsTeamsForm = ({ handleSubmit, pristine, submittingForm, invalid, addSponsorError, submitText, submitTextSubmitting }) => ( // eslint-disable-line
  <form onSubmit={handleSubmit}>
    <Field
      name="name"
      showErrorText
      component={formGroup}
      placeholder="Sponsor name"
      type="text"
      wrapperClassName="form-item-wrapper"
      inputClassName="form-item"
      errorClassName="form-item-error"
    />

    <Field
      name="amount"
      showErrorText
      component={formGroup}
      placeholder="Amount in ETH"
      type="text"
      wrapperClassName="form-item-wrapper"
      inputClassName="form-item"
      errorClassName="form-item-error"
    />

    <Field
      name="websiteUrl"
      showErrorText
      component={formGroup}
      placeholder="Website URL"
      type="text"
      wrapperClassName="form-item-wrapper"
      inputClassName="form-item"
      errorClassName="form-item-error"
    />

    <Field
      name="logoUrl"
      showErrorText
      component={formGroup}
      placeholder="Logo URL"
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
      { submittingForm ? submitTextSubmitting : submitText }
    </button>
  </form>
);

SponsorsTeamsForm.defaultProps = {
  submitTextSubmitting: 'Adding',
  submitText: 'Add',
};

const mapStateToProps = (state) => ({
  submittingForm: state.sponsors.submitting,
  addSponsorError: state.sponsors.addSponsorError
});

const validate = sponsorsFormValidator;

SponsorsTeamsForm = reduxForm({ form: 'sponsorsForm', validate })(SponsorsTeamsForm);

export default connect(mapStateToProps, { onSubmit: submitAddSponsorsForm })(SponsorsTeamsForm);
