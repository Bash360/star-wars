import React from "react";
import GenericButton from "../generic-button/";
import PropTypes from "prop-types";
import style from "./card.module.css";
function Card({src,alternate,name,text }){
  return (<div className={style.card}>
    <img alt={alternate} src={src}></img>
    <h5>{name}</h5>
    <p>{text}</p>
    <GenericButton width="30%" height="20px" text="Read More" icon="fas fa-arrow-right" />
  </div>);
}
Card.propTypes = {
  src: PropTypes.string,
  alternate: PropTypes.string,
  name: PropTypes.string,
  text:PropTypes.string
};
export default Card;