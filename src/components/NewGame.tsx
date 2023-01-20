import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/material/styles';
import { Box, Card, CardActions, CardContent, Button, Grid, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
interface IMossa {
  name: string;
}

const NewGame: React.FC = () => {
  const [mossaList, setMossaList] = useState<IMossa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [move, setMove] = useState<string | null>(null);
  const [hover, setHover] = useState(false);


  useEffect(() => {
    const fetchData = () => {
        return new Promise((resolve, reject) => {
            fetch("https://rps101.pythonanywhere.com/api/v1/objects/all")
                .then(res => res.json())
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    };

    setIsLoading(true);
    fetchData()
      .then(data => {
        setMossaList(data as IMossa[]);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: </p>;
  }

  function handleClick(data: string) {
    setMove(data)
    console.log(data)
  }

  

  return (
    <Box>
        <Grid sx={{display: "flex", justifyContent: "space-around", alignItems: "center", height:'30vh', color: 'white', flexDirection:"column"}}>
        <h1>New Game</h1>
        <h3>{ move ? move : "Choose your move"}</h3>
    </Grid>
    <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
      {mossaList.map((data, index) => (
        // <Button onClick={() => handleClick(data.toString())}>
        <Link to="/game" className='card' state={{ move: data.toString(), mossaList: mossaList}}>
            <Button variant="contained" sx={{backgroundColor: 'transparent'}} size="large">
            <Card key={index} sx={{ width:"20vh", backgroundColor: "transparent", boxShadow:'none'}}>
                <h3>{data.toString()}</h3>
            <CardMedia component="img" height="auto" src={`https://rps101.pythonanywhere.com/static/${index + 1}.png`}></CardMedia>
            </Card>
        </Button>
        </Link>
        // </Button>
      ))}
    </Box>
    </Box>
  );
};

export default NewGame;
