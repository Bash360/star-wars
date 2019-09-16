import React from 'react';
import style from './home.module.css';
import Button from '../button';
import InPutField from '../inputField';
import logo from "../../assets/logo.png";
function Home() {
  return (
    <form className={style.home} >
      <img src={logo}/>
 
        <Button label="search" />
        <InPutField type="search" placeholder="Enter a search term" />
   
  
    </form>
  );
}
export default Home;
