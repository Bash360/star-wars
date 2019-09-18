import React from 'react';
import PropTypes from 'prop-types';
import style from './button.module.css';
function SearchButton() {
  return (
    <button title="search" type="submit" className={style.myButton}>
    <i className="fa fa-search"></i>
    </button>
  );
}
SearchButton.propTypes = {
  label: PropTypes.string.isRequired,
};
export default SearchButton;
