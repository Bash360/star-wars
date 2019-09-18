import React from "react";
import PropTypes from "prop-types";
import style from "button.module.css";
function GenericButton({ width,height,}) { 
  return (<button className={style.button} style={{ "width": { width }, "height": {height}}}></button>);
}
GenericButton.PropTypes = {
  width: PropTypes.number,
  height:PropTypes.number
  
};
export default GenericButton;