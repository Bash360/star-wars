import React, { useState, useEffect, useContext } from 'react';
import StarshipCard from '../components/starship-card';
import axios from 'axios';
import { imageContext } from '../imageContext';
import style from './starship.module.css';
function Starships() {
  const [starships, setStarShip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [endpoint, setEndPoint] = useState(null);
  let [nextPage, setNextPage] = useState(null);
  let [prevPage, setPrevPage] = useState(null);
  let [isClicked, setIsCliked] = useState(false);
  let [count, setCount] = useState(1);
  let [max, setMax] = useState(null);
  const { starshipImages } = useContext(imageContext).imageResource;
  let starshipCards = [];
  const getStarShips = async (
    _endpoint = 'https://swapi.co/api/starships?page=1',
  ) => {
    const starshipResource = await axios.get(_endpoint);
    const { results, next, previous, count } = starshipResource.data;
    setStarShip(results);
    setNextPage(next);
    setPrevPage(previous);
    setLoading(false);
    setIsCliked(false);
    setMax(count);
  };
  const handleClick = event => {
    let target = event.target.getAttribute('name');
    setIsCliked(true);
    if (target === 'next') {
      setEndPoint(nextPage);
    }
    if (target === 'previous') {
      setEndPoint(prevPage);
    }
  };
  useEffect(() => {
    if (endpoint) {
      getStarShips(endpoint);
    } else {
      getStarShips();
    }
  }, [endpoint]);
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

      {isClicked && (
        <div className={`${style.spinner} ${style.spinner__pagination}`}>
          <i className="fa fa-spinner fa-spin"></i>
        </div>
      )}
      <div className={style.paginated}>
        <div
          className={style.starship__count}
        >{`${count}-${starships.length} of ${max}`}</div>
        <div className={style.pagination__button}>
          <div>
            <i
              name="previous"
              onClick={handleClick}
              className={`fa fa-angle-left ${style.left}`}
            ></i>
            <i
              name="next"
              onClick={handleClick}
              className={`fa fa-angle-right ${style.right}`}
            ></i>
          </div>
        </div>
      </div>
    </React.Fragment>
  ) : (
    <div className={style.spinner}>
      <i className="fa fa-spinner fa-spin"></i>
    </div>
  );
}

export default Starships;
