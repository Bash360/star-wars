import React from 'react';
import './App.css';
import Home from '../src/components/home/index';
import Starships from "../src/components/star-ships"

function App() {
  return (
    <div className="App">
      <Home />
      <Starships/>
    </div>
  );
}

export default App;
