import React, { useState, useEffect, useContext } from 'react';
import StarshipCard from '../../components/starship-card';
import axios from 'axios';
import { imageContext } from '../../imageContext';
import style from './starship.module.css';

function Starships() {
  const [starships, setStarShip] = useState([]);
  const [loading, setLoading] = useState(true);
  const [endpoint, setEndPoint] = useState(null);
  let [nextPage, setNextPage] = useState(null);
  let [prevPage, setPrevPage] = useState(null);
  let [isClicked, setIsCliked] = useState(false);
  let [from, setFrom] = useState(1);
  let [to, setTo] = useState(0);
  let [max, setMax] = useState(0);
  let [operation, setOperation] = useState(null);
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
    if (operation === 'next' && nextPage) setTo(prev => prev + results.length);
    else if (operation === 'previous' && from > 1)
      setTo(results.length - 1 - from);
    else setTo(from + results.length - 1);
  };
  const handleClick = event => {
    setIsCliked(true);
    let target = event.target.getAttribute('name');
    if (target === 'next' && nextPage) {
      setEndPoint(nextPage);
      setFrom(starships.length + 1);
      setOperation('next');
    }

    if (target === 'previous' && prevPage) {
      setEndPoint(prevPage);
      setFrom(starships.length - 1);
      setOperation('previous');
    }
    console.log(endpoint);
  };
  useEffect(() => {
    if (endpoint) {
      getStarShips(endpoint);
    }
    if (starships.length === 0) {
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

      {isClicked && to < max && from > 1 ? (
        <div className={`${style.spinner} ${style.spinner__pagination}`}>
          <i className="fa fa-spinner fa-spin"></i>
        </div>
      ) : (
        ''
      )}
      <div className={style.paginated}>
        <div className={style.starship__count}>{`${from}-${to} of ${max}`}</div>
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
