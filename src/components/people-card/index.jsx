import React from 'react';
import style from './people.module.css';
import { NavLink } from 'react-router-dom';

function PeopleCard({ src, alternate, name }) {
  return (
    <div className={style.people}>
      <img src={src} alt={alternate}></img>

      <div className={style.people__details}>
        <h5>{name}</h5>
        <p>Rank</p>
        <p className={style.people__about}>
          Lorem ipsum dolor sit amet, consectetur adipiut tristique et egestas.
          Nunc lobortis mattis aliquam faucibus. Sagittis orci a scelerisque
          purus semper eget duis. Id eu nisl nunc mi ipsum. Condimentum id
          venenatishdhddfdfnfdfdfjdjfdjfjdfjdjfd a condimentum. Congue eu
          consequat ac felis donec et odio pellentesque. Velit ut tortor pretium
          viverra suspendisse potenti nullam ac tortor.Ut enim blandit volutpat
          maecenas volutpat blandit aliquam etiam erat. Et malesuada fames ac
          turpis egestas. Porttitor rhoncus dolor purus non. Quis varius quam
          quisque id. Nisl purus in mollis nunc sed id semper risus in. Purus
          semper eget duis at. Elit duis tristique{' '}
        </p>
        <NavLink to="/">Read More</NavLink>
      </div>
    </div>
  );
}
export default PeopleCard;
