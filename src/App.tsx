import React from 'react';
import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import NewGame from './components/NewGame';
import MenuTop from './components/MenuTop';
import Game from './components/Game';

function App() {
  return (
    <div style={{backgroundColor: "#1f2023", minHeight: "100vh"}}>
    <MenuTop />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/newgame" element={<NewGame />} />
      <Route path="/game" element={<Game />} />
    </Routes>
    </div>
  );
}

export default App;
