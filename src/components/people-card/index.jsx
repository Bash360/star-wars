import React from 'react';
import style from './people.module.css';

function PeopleCard({ src, alternate, name }) {
  return (
    <div className={style.people}>
      <img src={src} alt={alternate}></img>
      <div className={style.people__details}></div>
    </div>
  );
}
export default PeopleCard;
