import React, { useState, useContext } from 'react';
import style from './head.module.css';
import SearchButton from '../search-button';
import InPutField from '../inputField';
import logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';
import searchContext from '../../searchContext';
function Head() {
  const { search, setSearch } = useContext(searchContext);
  const handleSubmit = event => {
    event.preventDefault();
  };
  const handleChange = event => {
    setSearch(event.target.value);
  };
  return (
    <section className={style.home}>
      <NavLink title="home" to="/">
        <img className={style.home__logo} alt="logo" src={logo} />
      </NavLink>
      <form className={style.home__form} onSubmit={handleSubmit}>
        <div className={style.home__top}>
          <img className={style.home__logo__dir} alt="star wars" src={logo} />_
          <span className={style.home__dir}>Directory</span>
          <hr />
        </div>
        <p className={style.home__text}>
          Find your favourite Characters, Films, Species, Starships and Planets
        </p>
        <div className={style.home__search}>
          <SearchButton label="search" />
          <InPutField
            change={handleChange}
            value={search}
            type="search"
            placeholder="Enter a search term"
          />
        </div>
      </form>
    </section>
  );
}
export default Head;
