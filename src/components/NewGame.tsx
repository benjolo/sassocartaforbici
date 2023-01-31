import React, { useState, useEffect } from 'react';
import { Box, Card, Button, Grid, CardMedia, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useMovesStore } from '../store/Moves';


const NewGame = () => {

  const store = useMovesStore(state => state);
  const newMoves = useMovesStore(state => state.updateMoves);
  const choose = useMovesStore(state => state.chooseMove);
  const setComputerMove = useMovesStore(state => state.setComputerMove);
  const setFetchOk = useMovesStore(state => state.setFetchOk);

  
  console.log("newgame")
  
    fetch('https://rps101.pythonanywhere.com/api/v1/objects/all')
      .then(response => response.json())
      .then(data => data.map(async (move: any, index:number) => {
        if(!store.moves.find(({ name }) => name === move))
        {
          let path: string ="";
          if(index === 18 || index === 35 || index == 39 || index == 54 || index == 48 || index == 75 || index == 84 || index == 85 || index == 88 || index == 90 )
            path = `https://rps101.pythonanywhere.com/static/${index + 1}.gif`
          else
            path = `https://rps101.pythonanywhere.com/static/${index + 1}.png`
          
          newMoves({ id: index + 1, name: move, image: path})
        }
        else
          console.log("already exist")
      }))

  function handleClick(index:number) {
    setFetchOk(false);
    choose(index + 1);
    const random = Math.floor(Math.random() * store.moves.length) + 1;
    setComputerMove(random);
  }

  return (<>
    <Box>
        <Grid sx={{display: "flex", justifyContent: "space-around", alignItems: "center", height:'30vh', color: 'white', flexDirection:"column"}}>
        <h1>New Game</h1>
        <h3>Choose your move</h3>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" color='success' sx={{color: "white"}}/>
      </Grid>
      <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
        {
          store.moves.map((data, index) => ( 
            <Link key={index} to="/game" className='card' onClick={() => handleClick(index)}>
                <Button variant="contained" sx={{backgroundColor: 'transparent'}} size="large">
                <Card sx={{ width:"20vh", backgroundColor: "transparent", boxShadow:'none'}}>
                    <h3>{data.name}</h3>
                <CardMedia component="img" height="auto" src={data.image}></CardMedia>
                </Card>
            </Button>
            </Link>
          ))
        }
      </Box>
    </Box>
    </>
  );

};

export default NewGame;
