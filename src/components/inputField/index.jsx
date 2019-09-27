import React from 'react';
import style from './input.module.css';
import PropTypes from 'prop-types';
function InputField({ type, placeholder, change }) {
  return (
    <input
      onChange={change}
      required
      className={style.input}
      type={type}
      placeholder={placeholder}
    ></input>
  );
}
InputField.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};
export default InputField;
