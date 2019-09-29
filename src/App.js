import React, { useState, useEffect } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import imageContext from './imageContext';
import StarshipPage from './pages/starships';
import Four0Four from './pages/404';
import Characters from './pages/characters';
import searchContext from './searchContext';
import Character from './pages/character';
import Starship from './pages/starship';

function App() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState({
    searchQuery: '',
    clickedSearch: false,
  });
  const [imageResource, setImageResource] = useState(null);
  const getImages = async () => {
    let starshipImages = await Promise.all([
      import('././assets/starship-1.jpg'),
      import('././assets/starship-2.jpg'),
      import('././assets/starship-3.jpg'),
      import('././assets/starship-4.jpg'),
      import('././assets/starship-5.jpg'),
      import('././assets/starship-6.jpg'),
    ]);
    let planetImages = await Promise.all([
      import('././assets/planet-1.jpg'),
      import('././assets/planet-2.jpg'),
      import('././assets/planet-3.jpg'),
    ]);
    let peopleImages = await Promise.all([
      import('././assets/character-1.jpg'),
      import('././assets/character-2.jpg'),
      import('././assets/character-3.jpg'),
      import('././assets/character-4.jpg'),
    ]);
    setImageResource({ starshipImages, planetImages, peopleImages });
    setLoading(false);
  };
  useEffect(() => {
    getImages();
  }, []);

  return !loading ? (
    <div className="App">
      <React.Fragment>
        <Switch>
          <searchContext.Provider value={{ search, setSearch }}>
            <imageContext.Provider value={{ imageResource }}>
              <Route path="/" strict exact component={Home} />
              <Route path="/starships" strict exact component={StarshipPage} />
              <Route path="/characters" strict exact component={Characters} />
              <Route
                path="/starships/:name"
                strict
                exact
                render={routerProps => <Starship {...routerProps} />}
              />
              <Route
                path="/characters/:name"
                strict
                exact
                render={routerProps => <Character {...routerProps} />}
              />
            </imageContext.Provider>
          </searchContext.Provider>
        </Switch>
      </React.Fragment>
    </div>
  ) : (
    ''
  );
}

export default App;
