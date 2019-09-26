import React from 'react';
import style from './planet.module.css';
function PlanetCard({ src, alternate, name }) {
  return (
    <div className={style.planet}>
      <img src={src} alt={alternate}></img>
      <p className={style.planet__name}>{name}</p>
    </div>
  );
}
export default PlanetCard;
