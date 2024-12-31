import {
  alpha,
  Box,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { LoginContext } from "../../../context/LoginContext";
import NotLoggedIn from "../../shared/NotLoggedIn/NotLoggedIn";
import { PokemonsContext } from "../../../context/PokemonsContext";

function Ranking() {
  const { pokemons } = useContext(PokemonsContext);
  const [sort, setSort] = useState("wonFights");
  const { isLogin } = useContext(LoginContext);
  const handleChange = (event) => {
    setSort(event.target.value);
  };
  if (!isLogin) {
    return <NotLoggedIn />;
  }

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        rowGap: "25px",
      }}
    >
      <FormControl variant="filled" sx={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Sort by</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={sort}
          onChange={handleChange}
        >
          <MenuItem value="baseExperience">Base Experience</MenuItem>
          <MenuItem value="weight">Weight</MenuItem>
          <MenuItem value="height">Height</MenuItem>
          <MenuItem value="wonFights">Won Fights</MenuItem>
        </Select>
      </FormControl>

      <Box
        sx={(theme) => ({
          height: "80%",
          display: "flex",
          justifyContent: "center",
          overflowY: "scroll",
          overflowX: "hidden",
          backgroundColor: alpha(theme.palette.background.default, 0.6),
          borderRadius: "25px",
        })}
      >
        <List>
          {pokemons.map(({ name, base_experience, height, weight, won_fights, lose_fights, key, image }, index) => (
            <ListItem key={key}>
              <ListItemButton>
                <Typography variant="body1" sx={{ marginRight: 1 }}>
                  {index + 1}.
                </Typography>
                <img src={image} />
                <ListItemText
                  primary={` Name: ${name} BaseExperience: ${base_experience} Height: ${height} Weight: ${weight} Won: ${
                    won_fights || "0"
                  } Lose: ${lose_fights || "0"}`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
export default Ranking;
