import React, { useState, useEffect, useContext } from 'react';
import StarshipCard from '../../components/starship-card';
import style from './home.module.css';
import axios from 'axios';
import GenericButton from '../../components/generic-button';
import { NavLink } from 'react-router-dom';
import PlanetCard from '../../components/planet-card';
import PeopleCard from '../../components/people-card';
import imageContext from '../../imageContext';
import Head from '../../components/head';
import text from '../../static-text';
import Carousel from '@brainhubeu/react-carousel';

function Home() {
  const [starships, setStarships] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const { starshipImages, planetImages, peopleImages } = useContext(
    imageContext,
  ).imageResource;
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

      planetCards.push();
      if (peopleCount <= 3) {
        peopleCards.push(
          <li key={people[index].url}>
            <PeopleCard
              birthYear={people[index].birth_year}
              gender={people[index].gender}
              src={peopleImages[peopleCount].default}
              name={people[index].name}
              alternate="people"
              text={text}
            />
          </li>,
        );
        peopleCount += 1;
      }
    }
  }

  return (
    <React.Fragment>
      <Head />
      {!loading ? (
        <React.Fragment>
          <h3 className={style.starships__header}>Popular Starships</h3>
          <hr />
          <div className={style.starships}>
            <ul>{starshipCards}</ul>
          </div>
          <NavLink className={style.home__link} to="/starships">
            <GenericButton text="View More" />
          </NavLink>
          <h3 className={style.planets__header}>Popular Planets</h3>
          <hr />
          <div className={style.planets}>
            <Carousel
              clickToChange
              centered={true}
              slidesPerPage={3}
              slidesPerScroll={3}
              infinite
              offset={20}
              stopAutoPlayOnHover
              itemWidth={500}
              autoPlay={2000}
              animationSpeed={1000}
            >
              {planets.map(planet => {
                let planetRandom = Math.floor(Math.random() * 2);
                return (
                  <PlanetCard
                    title="click"
                    key={planet.url}
                    src={planetImages[planetRandom].default}
                    name={planet.name}
                    alternate="planet"
                  ></PlanetCard>
                );
              })}
            </Carousel>
          </div>
          <h3 className={style.people__header}>Popular Characters</h3>
          <hr />
          <div className={style.people}>
            <ul>{peopleCards}</ul>
          </div>
          <NavLink className={style.home__link} to="/characters">
            <GenericButton text="View More" />
          </NavLink>
        </React.Fragment>
      ) : (
        <div className={style.spinner}>
          <i className="fa fa-spinner fa-spin"></i>
        </div>
      )}
    </React.Fragment>
  );
}

export default Home;
