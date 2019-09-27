import React from 'react';
import style from './404.module.css';
import errorImage from './404.gif';
import GenericButton from '../../components/generic-button';

export default function FourOFour() {
  const handleClick = () => {
    window.history.back();
  };
  return (
    <div className={style.error}>
      <h1>Page Not Found!!! </h1>
      <GenericButton
        onClick={handleClick}
        className={style}
        type="button"
        text="go back"
      />
      <img className={style.gif__block} src={errorImage} alt="error page" />
    </div>
  );
}
