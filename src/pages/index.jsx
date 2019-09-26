import React, { useState, useEffect, useContext } from 'react';
import StarshipCard from '../components/starship-card';
import axios from 'axios';
import { imageContext } from '../imageContext';
import style from './starship.module.css';
function Starships() {
  const [starships, setStarShip] = useState(null);
  const [loading, setLoading] = useState(true);
  const { starshipImages } = useContext(imageContext).imageResource;
  let starshipCards = [];
  const getStarShips = async () => {
    const starshipResource = await axios.get(
      'https://swapi.co/api/starships?page=1',
    );
    setStarShip(starshipResource.data.results);
    setLoading(false);
  };
  useEffect(() => {
    getStarShips();
  }, []);
  if (!loading) {
    starshipCards = starships.map(starship => {
      let { url, model, cargo_capacity, name } = starship;
      let random = Math.floor(Math.random() * 5);
      return (
        <li key={url}>
          <StarshipCard
            model={model}
            capacity={cargo_capacity}
            src={starshipImages[random].default}
            alternate="starship"
            name={name}
          />
        </li>
      );
    });
  }
  return !loading ? (
    <React.Fragment>
      <h3 className={style.starships__header}>Popular Starships</h3>
      <hr />
      <div className={style.starships}>
        <ul>{starshipCards}</ul>
      </div>
    </React.Fragment>
  ) : (
    <div className={style.spinner}>
      <i className="fa fa-spinner fa-spin"></i>
    </div>
  );
}

export default Starships;
