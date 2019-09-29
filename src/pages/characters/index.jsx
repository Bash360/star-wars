import React, { useState, useEffect, useContext } from 'react';
import CharacterCard from '../../components/people-card';
import imageContext from '../../imageContext';
import Head from '../../components/head';
import style from './characters.module.css';
import axios from 'axios';
import searchContext from '../../searchContext';
import text from '../../static-text';
export default function Characters() {
  const { peopleImages } = useContext(imageContext).imageResource;
  const [characters, setCharacters] = useState([]);
  const [endPoint, setEndPoint] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isClicked, setIsCliked] = useState(false);
  const [max, setMax] = useState(0);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(0);
  const { search } = useContext(searchContext);
  let isFound = false;

  let characterCards = [];

  const getCharacters = async (
    endPoint = 'https://swapi.co/api/people?page=1',
  ) => {
    const characterResource = await axios.get(endPoint);
    let { next, previous, results, count } = characterResource.data;
    setCharacters(results);
    setNextPage(next);
    setPrevPage(previous);
    setLoading(false);
    setMax(count);
    setIsCliked(false);
  };
  useEffect(() => {
    if (endPoint) getCharacters(endPoint);
    if (characters.length === 0) getCharacters();
  }, [endPoint]);
  const handleClick = event => {
    setIsCliked(true);

    let target = event.target.getAttribute('name');
    if (target === 'next' && nextPage) {
      setEndPoint(nextPage);
      setFrom(characters.length + 1);
    }

    if (target === 'previous' && prevPage) {
      setEndPoint(prevPage);
      setFrom(characters.length - 1);
    }
  };

  if (!loading) {
    characterCards = characters.map(character => {
      let random = Math.floor(Math.random() * 3);
      let { url, gender, name } = character;

      return (
        <li key={url}>
          <CharacterCard
            gender={gender}
            src={peopleImages[random].default}
            name={name}
            alternate="people"
            text={text}
          />
        </li>
      );
    });
  }
  if (search.clickedSearch) {
    let searchRegex = new RegExp(search.searchQuery, 'gi');
    characterCards = characters.map(character => {
      if (searchRegex.test(character.name)) {
        let random = Math.floor(Math.random() * 3);
        let { url, gender, name, birth_year } = character;
        isFound = true;
        return (
          <li key={url}>
            <CharacterCard
              gender={gender}
              src={peopleImages[random].default}
              name={name}
              alternate="people"
              text={text}
              birthYear={birth_year}
            />
          </li>
        );
      }
    });
  }
  return (
    <React.Fragment>
      <Head />
      {!isFound && search.clickedSearch ? (
        <p className={style.notfound}>Character not found</p>
      ) : (
        ''
      )}

      {!loading || (search.clickedSearch && isFound) ? (
        <React.Fragment>
          <h3 className={style.people__header}>Popular Characters</h3>
          <hr />
          <div className={style.select__parent}>
            <label className={style.label}>
              FILTER
              <select className={style.select}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="n/a">Robot</option>
              </select>
            </label>
          </div>
          <div className={style.people}>
            <ul>{characterCards}</ul>
          </div>
          {isClicked && to < max && from > 1 ? (
            <div className={`${style.spinner} ${style.spinner__pagination}`}>
              <i className="fa fa-spinner fa-spin"></i>
            </div>
          ) : (
            ''
          )}

          <div className={style.paginated}>
            <div
              className={style.character__count}
            >{`${from}-${to} of ${max}`}</div>
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
      )}
    </React.Fragment>
  );
}
