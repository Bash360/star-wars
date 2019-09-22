import React from 'react';
import GenericButton from '../generic-button/';
import PropTypes from 'prop-types';
import style from './card.module.css';
function Card({ src, alternate, name, text }) {
  return (
    <div className={style.card}>
      <img alt={alternate} src={src}></img>
      <h5>{name}</h5>
      <p>{text}</p>
      <GenericButton text="Read More" icon="fa fa-arrow-right" />
    </div>
  );
}
Card.propTypes = {
  src: PropTypes.string,
  alternate: PropTypes.string,
  name: PropTypes.string,
  text: PropTypes.string,
};
export default Card;
