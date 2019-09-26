import React, { useState, useEffect } from 'react';
import StarshipCard from '../starship-card';
import style from './home.module.css';
import axios from 'axios';
import GenericButton from '../generic-button';
import { NavLink } from 'react-router-dom';
import PlanetCard from '../planet-card';
import PeopleCard from '../people-card';

function Home() {
  const [starships, setStarships] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [starshipImages, setStarshipImages] = useState([]);
  const [planetImages, setPlanetImages] = useState([]);
  const [peopleImages, setPeopleImages] = useState([]);
  let starshipCards = [];
  let planetCards = [];
  let peopleCards = [];
  const fetchResources = async () => {
    const resources = await Promise.all([
      axios.get('https://swapi.co/api/starships?page=1'),
      axios.get('https://swapi.co/api/planets?page=1'),
      axios.get('https://swapi.co/api/people?page=1'),
    ]);

    setStarships(resources[0].data.results);
    setPlanets(resources[1].data.results);
    setPeople(resources[2].data.results);
    console.log(resources[2].data.results);
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
    let peopleCount = 0;
    for (let index = 0; index < 6; index++) {
      let { url, model, cargo_capacity, name } = starships[index];
      let random = Math.floor(Math.random() * 5);
      let planetRandom = Math.floor(Math.random() * 2);
      starshipCards.push(
        <li key={url}>
          <StarshipCard
            model={model}
            capacity={cargo_capacity}
            src={starshipImages[random].default}
            alternate="starship"
            name={name}
          />
        </li>,
      );

      planetCards.push(
        <li key={planets[index].url}>
          <PlanetCard
            src={planetImages[planetRandom].default}
            name={planets[index].name}
            alternate="planet"
          ></PlanetCard>
        </li>,
      );
      if (peopleCount <= 3) {
        peopleCards.push(
          <li key={people[index].url}>
            <PeopleCard
              src={peopleImages[peopleCount].default}
              name={people[index].name}
              alternate="people"
            />
          </li>,
        );
        peopleCount += 1;
      }
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
      <div className={style.planets}>
        <ul>{planetCards}</ul>
      </div>
      <h3 className={style.people__header}>Popular Characters</h3>
      <hr />
      <div className={style.people}>
        <ul>{peopleCards}</ul>
      </div>
      <NavLink className={style.home__link} to="/">
        <GenericButton text="View More" />
      </NavLink>
    </React.Fragment>
  ) : (
    <div className={style.spinner}>
      <i className="fa fa-spinner fa-spin"></i>
    </div>
  );
}

export default Home;
