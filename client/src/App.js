import React from 'react';
// import { BrowserRouter } from 'react-router-dom'

import './App.css';
import Navigation from './components/Navigation'
import ReactRouter from './router/ReactRouter'
import ScreenBorder from './components/ScreenBorder'


function App() {
  return (
    <div className='App'>
      <Navigation />
      <ReactRouter />
      <ScreenBorder />
    </div>
  );
}

export default App;
