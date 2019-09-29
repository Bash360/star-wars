import React from 'react';
import style from './character.module.css';
import logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';
function Character(props) {
  const { name } = props.match.params;
  const { src, gender, text } = props.location.state;
  console.log(src);
  return (
    <React.Fragment>
      <div
        style={{
          background: `url(${src})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '600px',
        }}
        className={style.character__image}
      >
        <NavLink title="home" to="/">
          {' '}
          <img className={style.logo} alt="logo" src={logo}></img>
        </NavLink>
      </div>
      <div className={style.character__details}>
        <h5 className={style.character__detail}>Name: {name}</h5>
        <h5 className={style.character__detail}>Gender: {gender}</h5>
        <p className={style.character__detail}>{text}</p>
      </div>
      <div className={style.characters__recently__viewed}>
        <h5>Recently Viewed Characters</h5>
      </div>
    </React.Fragment>
  );
}
export default Character;
