import React from 'react';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import NewGame from './components/NewGame';
import MenuTop from './components/MenuTop';
import Game from './components/Game';
import { Button } from '@mui/material';

function App() {
  console.log("App.tsx");
  return (
    <div style={{backgroundColor: "#1f2023", minHeight: "100vh"}}>
      <MenuTop />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/newgame" element={<NewGame />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<><h1>Not Found</h1><Link to="/"><Button variant='outlined'>Back Home</Button></Link></>} />
      </Routes>
    </div>
  );
}

export default App;
