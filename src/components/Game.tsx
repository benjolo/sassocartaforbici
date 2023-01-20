import { useLocation } from "react-router-dom";
import { Box, Card, CardActions, CardContent, Button, Grid, CardMedia } from '@mui/material';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';

const Game = () => {

    const location = useLocation();
    const { move, mossaList } = location.state;
    const [bol, setBol] = useState(false);
    const [result, setResult] = useState<any>(null);
    let index:number = Math.floor(Math.random() * mossaList.length);
    const [computerMove, setComputerMove] = useState<string | null>(mossaList[index]);
    const [winner, setWinner] = useState<string | null>(null);
    useEffect(() => {
        fetch(`https://rps101.pythonanywhere.com/api/v1/match?object_one=${move}&object_two=${computerMove}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setResult(data)
                if(data?.winner === move) {
                    console.log("You Win")
                    setWinner("You Win")
                } else if(data?.winner === computerMove) {
                    console.log("You Lose")
                    setWinner("You Lose")
                }
            })
            .catch(err => {
                console.log(err)
            });
    }, [])

    setTimeout(() => { setBol(true) }, 3000)

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', textAlign: 'center', color: 'white'}}>
            <h1>Game</h1>
            <Grid sx={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                <Card sx={{ width:"20vh", backgroundColor: "transparent", boxShadow:'none', color: 'white'}}>
                    <h3>{move}</h3>
                    <CardMedia component="img" height="auto" src={`https://rps101.pythonanywhere.com/static/18.png`}></CardMedia>
                </Card>
                <h1>VS</h1>
                <Card sx={{ width:"20vh", backgroundColor: "transparent", boxShadow:'none', color: 'white'}}>
                    <h3>{bol ? computerMove : "Computer Choose..."}</h3>
                    {bol ? <CardMedia component="img" height="auto" src={`https://rps101.pythonanywhere.com/static/${index}.png`}></CardMedia> : null}
                </Card>
            </Grid>
            {bol ?
            <Grid sx={{display: "flex", justifyContent: "space-around", alignItems: "center", flexDirection: 'column'}}>
                <Grid>
                    <h1 style={{color: winner?.includes("Lose") ? 'red' : 'green'}}>{winner}</h1>
                    <h1>{result?.winner + " " + result?.outcome + " " + result?.loser}</h1>
                </Grid>
                <Link to="/newgame">
                    <Button sx={{margin:"1vh"}} variant="contained" color="success" size="large" endIcon={<SportsKabaddiIcon/>}>New Game</Button>
                </Link>
                <Link to="/">
                    <Button variant="contained" color="success" size="large" >Back Home</Button>
                </Link>
            </Grid>
            :
            null
            }
        </Box>
    );
    };

export default Game;