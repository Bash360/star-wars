import React, { useState, useEffect } from 'react';
import Card from '../starship-card';
import style from './home.module.css';
import axios from 'axios';
import GenericButton from '../generic-button';
import { NavLink } from 'react-router-dom';
import { promised } from 'q';

function Home() {
  const [starships, setStarships] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [starshipImages, setStarshipImages] = useState([]);
  const [planetImages, setPlanetImages] = useState([]);
  const [peopleImages, setPeopleImages] = useState([]);
  let starshipCards = [];
  const fetchResources = async () => {
    const resources = await Promise.all([
      axios.get('https://swapi.co/api/starships?page=1'),
      axios.get('https://swapi.co/api/planets?page=1'),
      axios.get('https://swapi.co/api/people?page=1'),
    ]);

    setStarships(resources[0].data.results);
    setPlanets(resources[1].data.results);
    setPeople(resources[2].data.results);
    let starshipImages = await Promise.all([
      import('../../assets/starship-1.jpg'),
      import('../../assets/starship-2.jpg'),
      import('../../assets/starship-3.jpg'),
      import('../../assets/starship-4.jpg'),
      import('../../assets/starship-5.jpg'),
      import('../../assets/starship-6.jpg'),
    ]);
    let planetImages = await Promise.all([
      import('../../assets/planet-1.jpg'),
      import('../../assets/planet-2.jpg'),
      import('../../assets/planet-3.jpg'),
    ]);
    let peopleImages = await Promise.all([
      import('../../assets/character-1.jpg'),
      import('../../assets/character-2.jpg'),
      import('../../assets/character-3.jpg'),
      import('../../assets/character-4.jpg'),
    ]);
    setStarshipImages(starshipImages);
    setPlanetImages(planetImages);
    setPeopleImages(peopleImages);

    setLoading(false);
  };
  useEffect(() => {
    fetchResources();
  }, []);

  if (!loading) {
    for (let index = 0; index < 6; index++) {
      let { url, model, cargo_capacity, name } = starships[index];
      let random = Math.floor(Math.random() * 5);
      starshipCards.push(
        <li key={url}>
          <Card
            model={model}
            capacity={cargo_capacity}
            src={starshipImages[random].default}
            alternate="starship"
            name={name}
          />
        </li>,
      );
    }
  }

  return !loading ? (
    <React.Fragment>
      <h3 className={style.starships__header}>Popular Starships</h3>
      <hr />
      <div className={style.starships}>
        <ul>{starshipCards}</ul>
      </div>
      <NavLink className={style.home__link} to="/">
        <GenericButton text="View More" />
      </NavLink>
      <h3 className={style.planets__header}>Popular Planets</h3>
      <hr />
    </React.Fragment>
  ) : (
    <div className={style.spinner}>
      <i className="fa fa-spinner fa-spin"></i>
    </div>
  );
}

export default Home;
