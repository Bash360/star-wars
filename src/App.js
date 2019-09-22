import React from 'react';
import './App.css';
import Head from './components/head/index';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home';

function App() {
  return (
    <div className="App">
      <Head />
      <Switch>
        <Route path="/" strict exact component={Home} />
      </Switch>
    </div>
  );
}

export default App;
