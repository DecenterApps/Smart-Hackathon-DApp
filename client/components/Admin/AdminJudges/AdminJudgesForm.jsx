import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import formGroup from '../../FormComonent/FormComponent';
import { judgesFormValidator, submitAddJudgesForm } from '../../../actions/judgeActions';
import CubeLoader from '../../Decorative/CubeLoader/CubeLoader';

const styles = require('../../FormComonent/forms.scss');

let JudgesTeamsForm = ({ handleSubmit, pristine, submittingForm, invalid, addJudgeError }) => ( // eslint-disable-line
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

    { addJudgeError && <div className="submit-error">Error: {addJudgeError}</div> }

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
  submittingForm: state.judges.submitting,
  addJudgeError: state.judges.addJudgeError
});

const validate = judgesFormValidator;

JudgesTeamsForm = reduxForm({ form: 'judgesForm', validate })(JudgesTeamsForm);

export default connect(mapStateToProps, { onSubmit: submitAddJudgesForm })(JudgesTeamsForm);
