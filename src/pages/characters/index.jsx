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
  const [value, setValue] = useState('');
  const { search, setSearch } = useContext(searchContext);
  let isFound = false;
  const [clickFilter, setClickFilter] = useState(false);

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
    setClickFilter(false);
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
  const selectItem = event => {
    setClickFilter(true);
    setValue(event.target.value);
    setSearch({ ...search, clickedSearch: false });
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
    isFound = true;
    let searchRegex = new RegExp(search.searchQuery, 'gi');
    characterCards = characterCards.filter(characterCard =>
      searchRegex.test(characterCard.props.children.props.name),
    );
  }
  if (clickFilter && !search.clickedSearch) {
    characterCards = characterCards.filter(
      characterCard =>
        value === characterCard.props.children.props.gender.toLowerCase(),
    );
  }

  return (
    <React.Fragment>
      <Head />
      {!loading || (isFound && search.clickedSearch) ? (
        <React.Fragment>
          <h3 className={style.people__header}>Popular Characters</h3>
          <hr />
          <div className={style.select__parent}>
            <label className={style.label}>
              FILTER
              <select
                value={value}
                onChange={selectItem}
                className={style.select}
              >
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
