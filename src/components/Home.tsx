import { Box, Button, Grid} from '@mui/material';
import { Link } from "react-router-dom";
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';

const Home = () => {

    console.log("Home.tsx");
    return (
        <Box>
            <Grid className='backgroundGif' sx={{display: "flex", justifyContent: "space-around", alignItems: "center", height:'40vh', color: 'white'}}></Grid>
            <Grid sx={{display: "flex", justifyContent: "space-around", alignItems: "center", height:'20vh', color: 'white'}}><h1>Welcome to Rock Paper Scissors Evolution!</h1></Grid>
            <Grid sx={{display: "flex", justifyContent: "space-around", alignItems: "center", height:'20vh', color: 'white'}}>
                <Link to="/newgame">
                    <Button variant="contained" color="success" size="large" endIcon={<SportsKabaddiIcon/>}>New Game</Button>
                </Link>
            </Grid>
        
        </Box>
    );
};

export default Home;