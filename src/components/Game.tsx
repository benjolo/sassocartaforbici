import { Box, Card, Button, Grid, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import { Result, useMovesStore } from "../store/Moves";
import { useEffect } from "react";

const Game = () => {

  const store = useMovesStore();
  const move = useMovesStore((state) => state.getChoosedMove());
  const computerMove = useMovesStore((state) => state.getComputerMove());
  const setResult = useMovesStore((state) => state.setResult);

  useEffect(() => {
    
    fetch(
      `https://rps101.pythonanywhere.com/api/v1/match?object_one=${move.name}&object_two=${computerMove.name}`
    )
      .then((res) => res.json())
      .then((data) => {
        setResult({
          winner: data.winner,
          outcome: data.outcome,
          loser: data.loser,
        });
      });
  }, []);
  console.log("game");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        color: "white",
      }}
    >
      <h1>Game</h1>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            width: "20vh",
            backgroundColor: "transparent",
            boxShadow: "none",
            color: "white",
          }}
        >
          <h3>{move.name}</h3>
          <CardMedia component="img" height="auto" src={move.image}></CardMedia>
        </Card>
        <h1>VS</h1>
        <Card
          sx={{
            width: "20vh",
            backgroundColor: "transparent",
            boxShadow: "none",
            color: "white",
          }}
        >
          <h3>{computerMove.name}</h3>
          <CardMedia
            component="img"
            height="auto"
            src={computerMove.image}
          ></CardMedia>
        </Card>
      </Grid>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Grid>
          <h1 style={{ color: store.result.winner === move.name ? "green" : "red" }}>
            {store.result.winner === move.name ? "You Win" : "You Lose"}
          </h1>
          <h1>
            {store.result?.winner + " " + store.result?.outcome + " " + store.result?.loser}
          </h1>
        </Grid>
        <Link to="/newgame">
          <Button
            sx={{ margin: "1vh" }}
            variant="contained"
            color="success"
            size="large"
            endIcon={<SportsKabaddiIcon />}
          >
            New Game
          </Button>
        </Link>
        <Link to="/">
          <Button variant="contained" color="success" size="large">
            Back Home
          </Button>
        </Link>
      </Grid>
    </Box>
  );
};

export default Game;
