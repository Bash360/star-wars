import React from 'react';
import style from './home.module.css';
import Button from '../button';
import InPutField from '../inputField';
import logo from "../../assets/logo.png";
function Home() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <section className={style.home}>
      <img className={style.home__logo} alt="logo" src={logo} />
      <form className={style.home__form} onSubmit={handleSubmit}>
        <div className={style.home__top}>
          <img className={style.home__logo__dir} alt="star wars" src={logo} />_
          <span className={style.home__dir}>Directory</span>
          <hr />
           </div>
        <p className={style.home__text}>Find your favourite Characters, Films, Species, Starships and Planets</p>  
 <div className={style.home__search}>
        <Button label="search" />
        <InPutField type="search" placeholder="Enter a search term" />
   </div>
  
      </form>
      </section>
  );
}
export default Home;
