import React from 'react';
import GenericButton from '../generic-button';
import PropTypes from 'prop-types';
import style from './card.module.css';
function Card({ src, alternate, name, model, capacity }) {
  return (
    <div className={style.card}>
      <img alt={alternate} src={src}></img>
      <h5>{name}</h5>
      <p>Model: {model}</p>
      <p>Capacity: {capacity}</p>
      <GenericButton text="Read More" icon="fa fa-arrow-right" />
    </div>
  );
}
Card.propTypes = {
  src: PropTypes.string,
  alternate: PropTypes.string,
  name: PropTypes.string,
  model: PropTypes.string,
  capacity: PropTypes.string,
};
export default Card;
