import React from "react";

function Card({src,alternate,name,text }){
  return (<div>
    <img alt={alternate} src={src}></img>
    <h5>{name}</h5>
    <p>{text}</p>
  </div>);
}
export default Card;