import React from 'react';
import style from './people.module.css';
import { NavLink } from 'react-router-dom';

function PeopleCard(props) {
  const { src, alternate, name, gender, text } = props;
  return (
    <div className={style.people}>
      <img src={src} alt={alternate}></img>

      <div className={style.people__details}>
        <h5>{name}</h5>
        <p className={style.rank}>Rank:</p>
        <p className={style.gender}>Gender: {gender}</p>
        <p className={style.people__about}>{text}</p>
        <NavLink
          to={{
            pathname: `/characters/${name}`,
            search: '',
            hash: '',
            state: { ...props },
          }}
        >
          Read More
        </NavLink>
      </div>
    </div>
  );
}
export default PeopleCard;
