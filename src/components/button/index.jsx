import React from 'react';
import PropTypes from 'prop-types';
import style from './button.module.css';
function Button() {
  return (
    <button type="submit" className={style.myButton}>
    <i className="fa fa-search"></i>
    </button>
  );
}
Button.propTypes = {
  label: PropTypes.string.isRequired,
};
export default Button;
