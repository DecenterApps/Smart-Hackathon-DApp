import React from 'react';
import PropTypes from 'prop-types';

const FormGroup = ({
  input, placeholder, wrapperClassName, inputClassName, errorClassName,
  type, id, showLabel, labelText, labelClass, meta: { touched, error }
}) => (
  <div className={wrapperClassName}>
    <input {...input} placeholder={placeholder} id={id || ''} className={inputClassName} type={type}/>
    {showLabel && <label className={labelClass} htmlFor={id || ''}>{ labelText }</label>}
    {touched && ((error && <div className={errorClassName}>{error}</div>))}
  </div>
);

FormGroup.defaultProps = {
  showLabel: false,
  labelText: '',
  labelClass: ''
};

FormGroup.propTypes = {
  input: PropTypes.any.isRequired,
  placeholder: PropTypes.string.isRequired,
  wrapperClassName: PropTypes.string.isRequired,
  inputClassName: PropTypes.string.isRequired,
  errorClassName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
  labelText: PropTypes.string,
  labelClass: PropTypes.string,
  meta: PropTypes.object.isRequired
};

export default FormGroup;
