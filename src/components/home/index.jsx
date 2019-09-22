import React, { useState, useEffect } from 'react';
import Card from '../starship-card';
import style from './home.module.css';
import axios from 'axios';
import GenericButton from '../generic-button';

function Home() {
  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [starShipsPerPage, setStarShipPerPage] = useState(10);
  const [images, setImages] = useState([]);
  let cards;
  const fetchStarship = async () => {
    const fetchedStarships = await axios.get(
      'https://swapi.co/api/starships?page=1',
    );
    setStarships(fetchedStarships.data.results);
    let images = await Promise.all([
      import('../../assets/starship-1.jpg'),
      import('../../assets/starship-2.jpg'),
      import('../../assets/starship-3.jpg'),
      import('../../assets/starship-4.jpg'),
      import('../../assets/starship-5.jpg'),
      import('../../assets/starship-6.jpg'),
    ]);
    setImages(images);
    setLoading(false);
    console.log(fetchedStarships.data.results);
  };
  useEffect(() => {
    fetchStarship();
  }, []);

  if (!loading) {
    cards = starships.map(starship => {
      let random = Math.floor(Math.random() * 5);
      return (
        <li key={starship.url}>
          <Card
            model={starship.model}
            capacity={starship.cargo_capacity}
            src={images[random].default}
            alternate="starship"
            name={starship.name}
          />
        </li>
      );
    });
  }
  console.log(cards);
  return cards ? (
    <React.Fragment>
      <h3 className={style.starships__header}>Popular Starships</h3>
      <hr />
      <div className={style.starships}>
        <ul>{cards}</ul>
      </div>
    </React.Fragment>
  ) : (
    <div className={style.spinner}>
      <i className="fa fa-spinner fa-spin"></i>
    </div>
  );
}

export default Home;
