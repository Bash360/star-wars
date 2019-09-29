import React from 'react';
import style from './starship.module.css';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import text from '../../static-text';

function Starship(props) {
  const { model, capacity, src, name } = props.location.state;
  console.log(props);
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
        className={style.starship__image}
      >
        <NavLink title="home" to="/">
          {' '}
          <img className={style.logo} alt="logo" src={logo}></img>
        </NavLink>
      </div>
      <div className={style.starship__details}>
        <h5 className={style.starship__detail}>Name: {name}</h5>
        <h5 className={style.starship__detail}>Model: {model}</h5>
        <h5 className={style.starship__detail}>Capacity: {capacity}</h5>
        <p className={style.starship__detail}>{text}</p>
      </div>
      <div className={style.starships__recently__viewed}>
        <h5>Recently Viewed Characters</h5>
      </div>
    </React.Fragment>
  );
}
export default Starship;
