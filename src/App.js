import React from 'react';
import './App.css';
import Home from '../src/components/home/index';
import { Switch, Route } from 'react-router-dom';
import Starships from '../src/components/star-ships';

function App() {
  return (
    <div className="App">
      <Home />
      <Switch>
        <Route path="/" strict exact component={Starships} />
      </Switch>
    </div>
  );
}

export default App;
