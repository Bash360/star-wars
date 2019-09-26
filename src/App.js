import React, { useState, useEffect } from 'react';
import './App.css';
import Head from './components/head/index';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home';
import { imageContext } from './imageContext';

function App() {
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
  };
  useEffect(() => {
    getImages();
  }, []);
  return (
    <div className="App">
      <Head />
      <Switch>
        <imageContext.Provider value={{ imageResource }}>
          <Route path="/" strict exact component={Home} />
        </imageContext.Provider>
      </Switch>
    </div>
  );
}

export default App;
