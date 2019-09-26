import React from 'react';
import style from './card.module.css';
function PlanetCard({ src, alternate, name }) {
  return (
    <div className={style.planet}>
      <img src={src} alt={alternate}></img>
      <p>{name}</p>
    </div>
  );
}
export default PlanetCard;
