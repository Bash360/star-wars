import React from "react";
import Card from "../card/";
import style from "./starships.module.css";
import logo from "../../assets/starship-1.jpg";
 
// let Cards=
function Starships() {
 
  return (
    <React.Fragment>
   <h3 className={style.starships__header}>
    Popular Starships
    </h3>
   <hr/>
    <div className={style.starships}>
     
    <Card src={logo} alternate="starship" name="some ship" text="a starship used by lord i dont really know about starships" />
    <Card src={logo} alternate="starship" name="some ship" text="a starship used by lord i dont really know about starships" />
    <Card src={logo} alternate="starship" name="some ship" text="a starship used by lord i dont really know about starships"/>
      </div>
      </React.Fragment>

    );
  }
  
export default Starships;