import axios from 'axios';
const fetchStarship = async (setLoading, setStarships) => {
  setLoading(true);
  const starships = await axios.get(
    'https://cors-anywhere.herokuapp.com/https://swapi.co/api/starships',
  );
  setStarships(starships.results);
  setLoading(false);
};
export default fetchStarship;
