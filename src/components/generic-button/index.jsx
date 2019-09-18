import React from "react";
import PropTypes from "prop-types";
import style from "./button.module.css";
function GenericButton({ width,height,text,icon}) { 
  return (<button className={style.button} width={width} height={height}>{text} <i  className={icon}></i></button>);
}
GenericButton.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  text: PropTypes.string
  
};
export default GenericButton;